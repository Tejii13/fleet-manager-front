import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Organization, UserListResponse } from './interfaces';
import { APP_API_URL } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class FetchOrganizationDataService {
  constructor(private http: HttpClient) {}

  private url = APP_API_URL;

  getOrgInformation(orgId: number) {
    return this.http.get<Organization>(
      `${this.url}/api/organizations/${orgId}`
    );
  }

  getUsersList(orgId: number): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(
      `${this.url}/api/organizations/${orgId}/users`,
      {
        headers: { accept: 'application/json' },
      }
    );
  }
}
