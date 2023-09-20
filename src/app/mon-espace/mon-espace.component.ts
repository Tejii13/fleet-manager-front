import { FetchDataService } from './../fetch-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-mon-espace',
  templateUrl: './mon-espace.component.html',
  styleUrls: ['./mon-espace.component.scss'],
})
export class MonEspaceComponent implements OnInit {
  private id!: number;

  public username!: string;
  public showData: boolean = false;
  public mdpTemp!: string;
  public isAdmin: boolean = false;
  public showMembers: boolean = false;
  public showAddMembers: boolean = false;
  public members: Array<any> = [];

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
          this.showData = true;
          this.username = data.username;
          for (let role of data.roles) {
            if (role === 'ROLE_ADMIN') {
              this.isAdmin = true;
            }
          }
          if (this.isAdmin) {
            this.fetch.getUsersList(); // FIXME #showMembers
          }
        }
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  addMembers() {
    this.showAddMembers = true;
    this.showMembers = false;
  }

  viewMembers() {
    this.showMembers = true;
    this.showAddMembers = false;
  }

  disconnect() {
    this.cookieService.delete('auth', '/');
    this.router.navigate(['/']);
  }
}
