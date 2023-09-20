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
  username!: string;
  password!: string;
  members: any[] = [];

  constructor(
    private fetch: FetchDataService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
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
            this.router.navigate([`/mon-espace/${data.id}`]);
          }
        });
    } else {
      console.log('Veuillez remplir tous les champs');
    }
  }
}
