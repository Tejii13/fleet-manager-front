import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private cookieService: CookieService) {}

  private username!: string;
  public isConnected: boolean = false;

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
      console.log(this.isConnected);
    } else {
      this.disconnect();
    }
  }

  disconnect() {
    this.cookieService.delete('auth', '/');
    this.cookieService.delete('username', '/');
    this.isConnected = false;
    this.router.navigate(['/']);
  }
}
