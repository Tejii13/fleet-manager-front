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

  saveShip(
    id: number,
    shipName: string,
    size: string,
    production_status: string,
    manufacturer: string,
    focus: string,
    max_crew: number,
    url: string,
    description: string,
    image_url: string,
    cargocapacity: number,
    type: string,
    owner_username: string,
    obtention_method: string,
    loaner_for: string
  ) {
    const headers = new HttpHeaders({
      accept: 'application/ld+json',
      'Content-type': 'application/ld+json',
    });

    console.log(obtention_method);

    const requestBody = {
      owner: `api/users/${id}`,
      name: shipName,
      size: size,
      productionStatus: production_status,
      manufacturer: manufacturer,
      focus: focus,
      maxCrew: max_crew,
      url: url,
      description: description,
      imageUrl: image_url,
      cargoCapacity: cargocapacity,
      type: type,
      ownerUsername: owner_username,
      obtentionMethod: obtention_method,
      loaner_for: loaner_for,
    };

    console.log(requestBody);

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

  updateName(
    id: number,
    owner: string,
    name: string,
    nickname: string,
    size: string,
    productionStatus: string,
    manufacturer: string,
    focus: string,
    max_crew: number,
    url: string,
    description: string,
    image_url: string,
    cargocapacity: number,
    type: string
  ) {
    if (!size) {
      size = 'Non définie';
    }

    const requestBody = {
      id: id,
      owner: owner,
      name: name,
      nickname: nickname,
      size: size,
      productionStatus: productionStatus,
      manufacturer: manufacturer,
      type: type,
      maxCrew: max_crew,
      url: url,
      description: description,
      imageUrl: image_url,
      cargoCapacity: cargocapacity,
      focus: focus,
    };

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
