import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { InAppService } from 'src/app/in-app.service';

@Component({
  selector: 'app-sub-navbar-burger',
  templateUrl: './sub-navbar-burger.component.html',
  styleUrls: ['./sub-navbar-burger.component.scss'],
})
export class SubNavbarBurgerComponent {
  @Input() isAdmin: boolean = false;
  @Input() username!: string;
  @Input() currentView!: string;
  @Output() hideNav: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private cookieService: CookieService,
    private router: Router,
    public inApp: InAppService
  ) {}

  navigateToShips() {
    this.inApp.navigateToShips(this.username);
    this.hideNavBurger();
  }

  navigateToSynthesis() {
    this.inApp.navigateToSynthesis(this.username);
    this.hideNavBurger();
  }

  navigateToMembers() {
    if (this.isAdmin) {
      this.inApp.navigateToMembers(this.username);
      this.hideNavBurger();
    }
  }

  navigateToOverview() {
    if (this.isAdmin) {
      this.inApp.navigateToOverview(this.username);
      this.hideNavBurger();
    }
  }

  navigateToOrganization() {
    this.inApp.navigateToOrganization(this.username);
    this.hideNavBurger();
  }

  hideNavBurger() {
    this.hideNav.emit();
  }

  disconnect() {
    this.cookieService.delete('auth', '/');
    this.cookieService.delete('username', '/');
    this.router.navigate(['/']);
  }
}
