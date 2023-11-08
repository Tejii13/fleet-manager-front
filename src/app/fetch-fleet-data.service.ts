import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ship } from './interfaces';
import { Observable } from 'rxjs';
import { APP_API_URL } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class FetchFleetDataService {
  constructor(private http: HttpClient) {}

  private url = APP_API_URL;

  saveShip(requestBody: object) {
    const headers = new HttpHeaders({
      accept: 'application/ld+json',
      'Content-type': 'application/ld+json',
    });

    return this.http.post<Ship>(`${this.url}/api/ships`, requestBody, {
      headers: headers,
    });
  }

  deleteShip(shipId: number) {
    return this.http.delete(`${this.url}/api/ships/${shipId}`);
  }

  getShipInfo(userId: number): Observable<Ship[]> {
    return this.http.get<Ship[]>(`${this.url}/api/users/${userId}/ships`, {
      headers: { accept: 'application/json' },
    });
  }

  updateName(id: number, requestBody: object) {
    return this.http.put(`${this.url}/api/ships/${id}`, requestBody, {
      headers: { accept: 'application/json' },
    });
  }

  getOrgShipsList(id: number) {
    return this.http.get<Ship[]>(`${this.url}/api/organizations/${id}/ships`, {
      headers: { accept: 'application/json' },
    });
  }
}
