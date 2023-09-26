import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, catchError, switchMap } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { APP_API_URL } from 'src/environments/environment.local';
import { ConnectionStatus, UserListResponse } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(username: string, password: string): Observable<ConnectionStatus> {
    return this.http
      .post<ConnectionStatus>(`${APP_API_URL}/login`, {
        username,
        password,
      })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la récupération des informations: ',
            error
          );
          return of({
            message: "Impossible de s'identifier.",
            code: 401,
            auth: '',
          });
        })
      );
  }

  registerUser(username: string, role: Array<string>): Observable<any> {
    const url = `${APP_API_URL}/register`;
    console.log(url);
    const headers = new HttpHeaders({
      accept: 'application/ld+json',
      'Content-Type': 'application/ld+json',
    });

    console.log('Service: ' + username);
    console.log('Service: ' + role);

    const requestBody = {
      username: username,
      roles: [role],
    };

    return this.http.post(url, requestBody, { headers: headers });
  }

  getUserinfo(id: number): Observable<any> {
    return this.checkConnection(id).pipe(
      switchMap((response: any) => {
        if (!response) {
          return of(false);
        } else {
          const url = `${APP_API_URL}/users/${id}`;
          const headers = new HttpHeaders({
            accept: 'application/ld+json',
          });
          return this.http.get<any>(url, { headers }).pipe(
            catchError((error) => {
              console.error(
                'Erreur lors de la récupération des informations: ',
                error
              );
              return of(false);
            })
          );
        }
      })
    );
  }

  checkConnection(id: number) {
    const url = `${APP_API_URL}/verify`;
    const headers = new HttpHeaders({
      accept: 'application/ld+json',
    });

    const authCookieExpires = this.cookieService.get('auth');

    const requestBody = {
      id: id,
      auth: authCookieExpires,
    };

    return this.http
      .put(url, requestBody, {
        headers: headers,
      })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la vérification de la connexion: ',
            error
          );
          return of(false);
        })
      );
  }

  getUsersList(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${APP_API_URL}/users`, {
      headers: { accept: 'application/ld+json' },
    });
  }
}
