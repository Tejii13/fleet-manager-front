import { FetchFleetService } from 'src/app/fetch-fleet.service';
import { Ship, ShipData } from 'src/app/interfaces';
import { StarCitizenApiService } from 'src/app/star-citizen-api.service';
import { FetchDataService } from '../../../fetch-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mon-espace',
  templateUrl: './mon-espace.component.html',
  styleUrls: ['./mon-espace.component.scss'],
})
export class MonEspaceComponent implements OnInit {
  @Input() currentView: string = 'ships';

  constructor(
    private scApi: StarCitizenApiService,
    private route: ActivatedRoute,
    private fetchData: FetchDataService,
    private fetchFleet: FetchFleetService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  private id!: number;

  public showData: boolean = false;
  public isAdmin: boolean = false;
  public verifyPassword: boolean = false;
  public members: Array<any> = [];
  public username!: string;
  public mdpTemp!: string;
  public newPassword!: string;
  public confirmPassword!: string;
  public showShips: boolean = true;
  public organizationId!: number;
  public userId!: number;

  public ships!: ShipData[];
  public fleet!: Ship[];
  public fleetEmpty: boolean = true;
  public isFetchingShipsData: boolean = true;
  public isFetchingUsersFleet: boolean = true;

  inputUsername!: string;
  inputRole!: Array<string>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get the 'id' parameter from the current URL
    this.router.navigate(['/mon-espace', id], {
      queryParams: { view: 'ships' },
    });

    // Verifies if the id in the route is not null
    if (id !== null) {
      this.id = +id;

      // If not null, fetches user info if he is connected
      this.fetchData.getUserinfo(this.id).subscribe((data) => {
        console.log(data);
        // Verifies if the 2 uuids are the same
        if (!data) {
          console.log('Pas connecté');
          this.router.navigate(['/']);
        } else {
          this.handleDataFetch(data);
          this.getShipsData();
          this.getFleetData();
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

          // Isolate organization id from iri
          if (data.organization_leader || data.organizationLeader) {
            const organizationArray = data.organizations[0].split('/');
            this.organizationId =
              organizationArray[organizationArray.length - 1];
            console.log(this.organizationId);
            return true;
          }
        }
      }
    }
    return false;
  }

  getShipsData() {
    this.isFetchingShipsData = true;
    this.scApi.fetchAllShips().subscribe(
      (response: Array<ShipData>) => {
        this.isFetchingShipsData = false;
        if (response && response.length !== 0) {
          console.log('Received Ship Data:', response);
          this.ships = response.filter((ship) => ship !== null);
        } else {
          console.log('There is no ship to display here');
        }
      },
      (error) => {
        console.error('Error while fetching ship information:', error);
      }
    );
  }

  getFleetData() {
    this.isFetchingUsersFleet = true;
    if (this.userId) {
      this.fetchFleet.getShipInfo(this.userId).subscribe((response) => {
        this.isFetchingUsersFleet = false;
        this.fleet = [];
        this.fleet = response;
        if (this.fleet.length > 0) {
          this.fleetEmpty = false;
        } else {
          this.fleetEmpty = true;
        }
        console.log(this.fleet);
      });
    }
  }

  onShowShipsChange(value: boolean) {
    this.showShips = value;
  }

  // Verifies if a new password is already set
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
