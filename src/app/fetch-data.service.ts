import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, catchError, switchMap } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { APP_API_URL } from 'src/environments/environment.local';
import {
  CheckConnection,
  ConnectionStatus,
  UserListResponse,
} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private url = APP_API_URL;

  login(username: string, password: string): Observable<ConnectionStatus> {
    return this.http
      .post<ConnectionStatus>(`${this.url}/api/login`, {
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

  registerUser(
    username: string,
    role: Array<string>,
    organizationId: number
  ): Observable<any> {
    const url = `${this.url}/api/register`;
    console.log(url);
    const headers = new HttpHeaders({
      accept: 'application/ld+json',
      'Content-Type': 'application/ld+json',
    });

    if (!organizationId) {
      return of(null);
    }

    const requestBody = {
      username: username,
      roles: [role],
      organizationId: [organizationId],
    };

    console.log(requestBody);

    return this.http.post(url, requestBody, { headers: headers });
    // return of(true);
  }

  getUserinfo(id: number): Observable<any> {
    return this.checkConnection().pipe(
      switchMap((response) => {
        if (!response) {
          return of(false);
        } else {
          const url = `${this.url}/api/users/${id}`;
          const headers = new HttpHeaders({
            accept: 'application/json',
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

  checkConnection(): Observable<CheckConnection> {
    const url = `${this.url}/api/verify`;
    const headers = new HttpHeaders({
      accept: 'application/json',
    });

    const authCookie = this.cookieService.get('auth');

    const requestBody = {
      auth: authCookie,
    };

    return this.http
      .put<CheckConnection>(url, requestBody, {
        headers: headers,
      })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la vérification de la connexion: ',
            error
          );
          return of({
            message: 'Erreur lors de la vérification de la connexion: ',
            code: 401,
          });
        })
      );
  }

  getUsersList(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.url}/api/users`, {
      headers: { accept: 'application/ld+json' },
    });
  }
}
