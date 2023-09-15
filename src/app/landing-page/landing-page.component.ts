import { Component, OnInit } from '@angular/core';

import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  username!: string;
  password!: string;
  members: any[] = [];

  constructor(private fetch: FetchDataService) {}

  ngOnInit(): void {}

  async onSubmit() {
    if (this.username && this.password) {
      this.fetch.login(this.username, this.password).subscribe((data) => {
        console.log(data);
      });
    } else {
      console.log('Veuillez remplir tous les champs');
    }
  }
}
