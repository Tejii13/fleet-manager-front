import { Component, OnInit } from '@angular/core';

import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  username!: string;
  authToken!: string;

  constructor(private fetch: FetchDataService) {}

  ngOnInit(): void {}

  async onSubmit() {
    if (this.username && this.authToken) {
      console.log(this.username);
      console.log(this.authToken);

      const data = await this.fetch.getUser(this.username, this.authToken);
    } else {
      console.log('Veuillez remplir tous les chams');
    }
  }
}
