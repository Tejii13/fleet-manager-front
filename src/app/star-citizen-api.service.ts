import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, switchMap, of, Observable } from 'rxjs';

import { SC_API_KEY } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class StarCitizenApiService {
  constructor(private http: HttpClient) {}

  private url = `https://api.starcitizen-api.com/${SC_API_KEY}/cache/ships`;

  private shipsData: object[] = [];

  private verifyData(response: any): any {
    if (response && response.success) {
      return this.shipsData.push(response.data);
    } else {
      throw new Error('Request was not successful');
    }
  }

  fetchShip(shipName: string): Observable<any> {
    return this.http.get<any>(`${this.url}?name=${shipName}`).pipe(
      switchMap((response: any) => {
        return this.verifyData(response);
      }),
      catchError((error) => {
        console.error('Error while fetching ship information: ', error);
        return of(null);
      })
    );
  }

  fetchAllShips(): Observable<any> {
    console.log(`${this.url}`);
    return this.http.get<any>(this.url).pipe(
      switchMap((response: any) => {
        this.verifyData(response);
        return this.shipsData;
      }),
      catchError((error) => {
        console.error('Error while fetching ship information: ', error);
        return of(null);
      })
    );
  }
}
