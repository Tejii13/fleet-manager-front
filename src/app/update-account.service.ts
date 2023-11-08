import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_API_URL } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class UpdateAccountService {
  constructor(private http: HttpClient) {}

  private url = APP_API_URL;

  updatePassword(userId: number, password: string) {
    const headers = new HttpHeaders({
      accept: 'application/ld+json',
      'Content-Type': 'application/ld+json',
    });
    return this.http.put(
      `${this.url}/api/update/password`,
      { userId, password },
      { headers: headers }
    );
  }

  deleteAccount(organizationId: number, userId: number) {
    return this.http.post(
      `${this.url}/api/organizations/${organizationId}/users/${userId}`,
      {}
    );
  }
}
