import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { APP_API_URL } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    try {
      const roles = ['admin'];
      return this.http.post(`${APP_API_URL}/login`, {
        username,
        roles,
        password,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des informations: ', error);
      return of(false);
    }
  }
}
