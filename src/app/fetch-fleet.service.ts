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

  saveShip(id: number, shipName: string, size: number, nickname?: string) {
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

  deleteShip() {}

  getShipInfo(shipUrl: string): Observable<Ship> {
    return this.http.get<Ship>(`${this.url}${shipUrl}`, {
      headers: { accept: 'application/json' },
    });
  }
}
