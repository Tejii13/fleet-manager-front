import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateAccountService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8000/api';

  updatePassword(userId: number, password: string) {
    const headers = new HttpHeaders({
      accept: 'application/ld+json',
      'Content-Type': 'application/ld+json',
    });
    return this.http.put(
      `${this.url}/update/password`,
      { userId, password },
      { headers: headers }
    );
  }

  getRandomId(userId: number) {
    const headers = new HttpHeaders({
      accept: 'application/ld+json',
    });
    return this.http
      .put(
        `http://localhost:8000/api/randomId`,
        { userId },
        { headers: headers }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
