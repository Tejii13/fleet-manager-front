import { Member } from 'src/app/interfaces';
import { CheckConnection } from './../interfaces';
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

  ngOnInit(): void {
    this.fetch.checkConnection().subscribe((response: CheckConnection) => {
      console.log(response);
      if (response) {
        this.isConnected = true;
        if (response.id) {
          this.fetch.getUserinfo(response.id).subscribe((response: Member) => {
            this.member = response;
            console.log(this.member);
          });
        }
      }
    });
  }

  onSubmit() {
    if (this.username && this.password) {
      console.log(this.username);
      console.log(this.password);
      this.fetch
        .login(this.username, this.password)
        .subscribe((data: ConnectionStatus) => {
          console.log(data);
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
          }
        });
    } else {
      console.log('Veuillez remplir tous les champs');
    }
  }

  disconnect() {
    this.cookieService.delete('auth', '/');
    this.cookieService.delete('name', '/');
    this.isConnected = false;
  }
}
