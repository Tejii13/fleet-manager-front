import { FetchFleetDataService } from 'src/app/fetch-fleet-data.service';
import { CheckConnection, Ship, ShipData } from 'src/app/interfaces';
import { StarCitizenApiService } from 'src/app/star-citizen-api.service';
import { FetchUserDataService } from '../../../fetch-user-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { InAppService } from 'src/app/in-app.service';

@Component({
  selector: 'app-mon-espace',
  templateUrl: './mon-espace.component.html',
  styleUrls: ['./mon-espace.component.scss'],
})
export class MonEspaceComponent implements OnInit {
  // @Input() currentView: string = 'ships';

  constructor(
    private scApi: StarCitizenApiService,
    private route: ActivatedRoute,
    private fetchUserData: FetchUserDataService,
    private fetchFleetData: FetchFleetDataService,
    private cookieService: CookieService,
    private router: Router,
    private inApp: InAppService
  ) {}

  public showData: boolean = false;
  public isAdmin: boolean = false;
  public isLeader: boolean = false;
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

  public inputUsername!: string;
  public inputRole!: Array<string>;

  public currentView!: string;

  ngOnInit(): void {
    const urlUsername = this.route.snapshot.paramMap.get('id'); // Get the 'id' parameter from the current URL

    this.getRoute();

    // Verifies if the id in the route is not null
    if (urlUsername !== null) {
      // If not null, fetches user info if he is connected
      this.fetchUserData
        .checkConnection()
        .subscribe((response: CheckConnection) => {
          if (response && response.id) {
            this.fetchUserData.getUserinfo(response.id).subscribe((data) => {
              if (!data) {
                this.disconnect();
              } else {
                this.handleDataFetch(data);
                this.getShipsData();
                this.getFleetData();
              }
            });
          } else {
            this.disconnect();
          }
        });
    } else {
      this.disconnect();
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
      this.isLeader = false;
      this.showData = false;
    } else {
      // If it's not the first connection
      for (let role of data.roles) {
        if (role === 'leader') {
          this.isLeader = true;
          console.log('isLeader');
        }
        if (role === 'admin') {
          this.isAdmin = true;
          console.log('isAdmin');
          // Isolate organization id from iri
          if (data.organization_leader || data.organizationLeader) {
            const organizationArray = data.organizations[0].split('/');
            this.organizationId =
              organizationArray[organizationArray.length - 1];
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
          this.ships = response.filter((ship) => ship !== null);
        } else {
        }
      },
      (error) => {
        console.error('Error while fetching ship information:', error);
      }
    );
  }

  getFleetData() {
    this.getRoute();

    this.isFetchingUsersFleet = true;
    if (this.userId) {
      this.fetchFleetData.getShipInfo(this.userId).subscribe((response) => {
        this.isFetchingUsersFleet = false;
        this.fleet = [];
        this.fleet = response;
        if (this.fleet.length > 0) {
          this.fleetEmpty = false;
        } else {
          this.fleetEmpty = true;
        }
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

  getRoute() {
    this.route.queryParams.subscribe((params) => {
      switch (params['view']) {
        case 'ships':
          this.currentView = 'ships';
          break;
        case 'members':
          if (this.isAdmin) {
            this.currentView = 'members';
          } else {
            this.inApp.navigateToShips(this.username);
          }
          break;
        case 'overview':
          if (this.isAdmin) {
            this.currentView = 'overview';
          } else {
            this.inApp.navigateToShips(this.username);
          }
          break;
        case 'synthesis':
          this.currentView = 'synthesis';
          break;
        case 'organization':
          this.currentView = 'organization';
          break;
        default:
          this.currentView = 'ships';
      }
    });
  }

  disconnect() {
    this.cookieService.delete('auth', '/');
    this.cookieService.delete('username', '/');
    this.router.navigate(['/']);
  }
}
