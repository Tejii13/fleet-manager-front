import { InAppService } from 'src/app/in-app.service';
import { Member } from 'src/app/interfaces';
import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';

import { ConnectionStatus } from '../interfaces';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    private fetch: FetchDataService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  public username!: string;
  public password!: string;

  public isConnected: boolean = false;
  public member!: Member;

  public isConnecting: boolean = false;
  public fieldsAreValid: boolean = true;

  ngOnInit(): void {
    this.username = this.cookieService.get('username');
    const authCookie = this.cookieService.get('auth');

    if (
      this.username &&
      authCookie &&
      this.username !== '' &&
      authCookie !== ''
    ) {
      this.isConnected = true;
    } else {
      this.disconnect();
    }
  }

  onSubmit() {
    if (this.username && this.password) {
      this.fieldsAreValid = true;
      this.isConnecting = true;
      this.fetch
        .login(this.username, this.password)
        .subscribe((data: ConnectionStatus) => {
          if (data.code === 201) {
            const expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 1);

            this.cookieService.set('auth', data.auth, expirationDate, '/');
            this.cookieService.set(
              'username',
              this.username,
              expirationDate,
              '/'
            );
            this.router.navigate([`/mon-espace/${data.username}`]);
          } else {
            this.isConnecting = false;
            this.fieldsAreValid = false;
          }
        });
    } else {
      this.fieldsAreValid = false;
    }
  }

  disconnect() {
    this.cookieService.delete('auth', '/');
    this.cookieService.delete('username', '/');
    this.isConnected = false;
  }
}
