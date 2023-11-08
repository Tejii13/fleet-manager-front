import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UserListResponse } from './interfaces';
import { APP_API_URL } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class FetchOrganizationDataService {
  constructor(private http: HttpClient) {}

  private url = APP_API_URL;

  getUsersList(id: number): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(
      `${this.url}/api/organizations/${id}/users`,
      {
        headers: { accept: 'application/json' },
      }
    );
  }
}
