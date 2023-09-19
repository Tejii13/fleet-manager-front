import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';

import { connectionStatus } from '../interfaces';

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

  constructor(private fetch: FetchDataService, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit() {
    if (this.username && this.password) {
      this.fetch
        .login(this.username, this.password)
        .subscribe((data: connectionStatus) => {
          console.log(data);
          if (data.code === 201) {
            this.router.navigate([`/mon-espace/${data.id}`]);
          }
        });
    } else {
      console.log('Veuillez remplir tous les champs');
    }
  }
}
