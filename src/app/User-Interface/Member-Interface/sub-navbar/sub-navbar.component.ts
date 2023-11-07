import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { InAppService } from 'src/app/in-app.service';

@Component({
  selector: 'app-sub-navbar',
  templateUrl: './sub-navbar.component.html',
  styleUrls: ['./sub-navbar.component.scss'],
})
export class SubNavbarComponent {
  @Input() isAdmin: boolean = false;
  @Input() username!: string;
  @Input() currentView!: string;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    public inApp: InAppService
  ) {}

  navigateToShips() {
    this.inApp.navigateToShips(this.username);
  }

  navigateToSynthesis() {
    this.inApp.navigateToSynthesis(this.username);
  }

  navigateToMembers() {
    if (this.isAdmin) {
      this.inApp.navigateToMembers(this.username);
    }
  }

  navigateToOverview() {
    if (this.isAdmin) {
      this.inApp.navigateToOverview(this.username);
    }
  }

  navigateToOrganization() {
    if (this.isAdmin) {
      this.inApp.navigateToOrganization(this.username);
    }
  }

  disconnect() {
    this.cookieService.delete('auth', '/');
    this.cookieService.delete('username', '/');
    this.router.navigate(['/']);
  }
}
