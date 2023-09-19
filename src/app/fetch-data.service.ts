import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';

import { APP_API_URL } from 'src/environments/environment.local';
import { ConnectionStatus, Member } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient) {}
  private roles = ['ROLE_ADMIN'];

  login(username: string, password: string): Observable<ConnectionStatus> {
    const role = this.roles;
    return this.http
      .post<ConnectionStatus>(`${APP_API_URL}/login`, {
        username,
        role,
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
          });
        })
      );
  }

  getUserinfo(id: number): Observable<Member> {
    const url = `${APP_API_URL}/users/${id}`;
    const headers = new HttpHeaders({
      accept: 'application/ld+json',
    });

    return this.http.get<Member>(url, { headers });
  }

  registerUser(username: string, role: Array<string>): Observable<any> {
    const url = `${APP_API_URL}/register`;
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
}
