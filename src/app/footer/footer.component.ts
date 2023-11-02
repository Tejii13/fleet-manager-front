import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private cookieService: CookieService) {}

  public username!: string;

  ngOnInit() {
    this.username = this.cookieService.get('username');
  }
}
