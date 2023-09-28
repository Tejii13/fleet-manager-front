import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ship } from './interfaces';
import { Observable } from 'rxjs';
import { APP_API_URL } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class FetchFleetService {
  constructor(private http: HttpClient) {}

  private url = APP_API_URL;

  saveShip(id: number, shipName: string, size: string, nickname?: string) {
    const headers = new HttpHeaders({
      accept: 'application/ld+json',
      'Content-type': 'application/ld+json',
    });

    const requestBody = {
      owner: `api/users/${id}`,
      name: shipName,
      size: size,
    };

    return this.http.post<Ship>(`${this.url}/api/ships`, requestBody, {
      headers: headers,
    });
  }

  deleteShip(shipId: number) {
    return this.http.delete(`${this.url}/api/ships/${shipId}`);
  }

  getShipInfo(userId: number): Observable<Ship[]> {
    const requestBody = {
      userId: userId,
    };
    return this.http.post<Ship[]>(`${this.url}/api/shipsList`, requestBody, {
      headers: { accept: 'application/json' },
    });
  }
}
