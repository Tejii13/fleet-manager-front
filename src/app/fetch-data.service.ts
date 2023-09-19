import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';

import { APP_API_URL } from 'src/environments/environment.local';
import { connectionStatus } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<connectionStatus> {
    const roles = ['admin'];
    return this.http
      .post<connectionStatus>(`${APP_API_URL}/login`, {
        username,
        roles,
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

  // getUsername() {}
}
