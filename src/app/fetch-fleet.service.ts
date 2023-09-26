import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ship } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class FetchFleetService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8000/api';

  saveShip(id: number, shipName: string, size: number, nickname?: string) {
    console.log(this.url + '/ships');
    console.log('shipName service: ' + shipName);
    const headers = new HttpHeaders({
      accept: 'application/ld+json',
      'Content-type': 'application/ld+json',
    });

    const requestBody = {
      owner: `api/users/${id}`,
      name: shipName,
      size: size,
    };

    return this.http.post<Ship>(`${this.url}/ships`, requestBody, {
      headers: headers,
    });
  }

  deleteShip() {}

  getShipsList() {}
}
