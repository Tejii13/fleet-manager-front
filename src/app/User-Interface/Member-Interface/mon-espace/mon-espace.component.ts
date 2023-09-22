import { FetchDataService } from '../../../fetch-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mon-espace',
  templateUrl: './mon-espace.component.html',
  styleUrls: ['./mon-espace.component.scss'],
})
export class MonEspaceComponent implements OnInit {
  private id!: number;

  public showData: boolean = false;
  public isAdmin: boolean = false;
  public verifyPassword: boolean = false;
  public members: Array<any> = [];
  public username!: string;
  public mdpTemp!: string;
  public newPassword!: string;
  public confirmPassword!: string;

  public userId!: number;

  inputUsername!: string;
  inputRole!: Array<string>;

  constructor(
    private route: ActivatedRoute,
    private fetch: FetchDataService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verifies if the id in the route is not null
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute !== null) {
      this.id = +idFromRoute;

      // If not null, fetches user info if he is connected
      this.fetch.getUserinfo(this.id).subscribe((data) => {
        // Verifies if the 2 uuids are the same
        if (!data) {
          console.log('Pas connecté');
          this.router.navigate(['/']);
        } else {
          this.handleDataFetch(data);
        }
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  handleDataFetch(data: any) {
    this.showData = true;
    this.username = data.username;
    this.userId = data.id;
    // Verifies if it's the first connection
    if (!data.verified) {
      this.verifyPassword = true;
      this.isAdmin = false;
      this.showData = false;
    } else {
      // If it's not the first connection
      for (let role of data.roles) {
        if (role === 'ROLE_ADMIN') {
          this.isAdmin = true;
        }
      }
      if (this.isAdmin) {
        this.getUsers();
      }
    }
  }

  private getUsers() {
    this.fetch.getUsersList(); // FIXME #showMembers
  }

  handlePasswordVerified(passwordVerified: boolean) {
    if (passwordVerified) {
      this.showData = true;
      this.verifyPassword = false;
    }
  }

  disconnect() {
    this.cookieService.delete('auth', '/');
    this.router.navigate(['/']);
  }
}
