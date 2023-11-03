import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router, private cookieService: CookieService) {}

  private username!: string;
  public isConnected: boolean = false;

  disconnect() {
    this.cookieService.delete('auth', '/');
    this.cookieService.delete('username', '/');
    this.isConnected = false;
    this.router.navigate(['/']);
  }
}
