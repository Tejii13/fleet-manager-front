import { Ship } from 'src/app/interfaces';
import { FetchFleetService } from 'src/app/fetch-fleet.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @Input() orgId!: number;

  constructor(private fetchFleet: FetchFleetService) {}

  public isAdmin: boolean = true;
  public fleetEmpty: boolean = true;
  public data: boolean = false;

  public showHangar: boolean = false;

  public ships!: Ship[];
  public shipToRemove!: number | null;

  public memberId!: number;

  public scrollLocked: boolean = false;

  public types: {
    type: string;
    ships: Ship[];
    cargoMax: number;
    crewMax: number;
    flightReady: number;
    shipCount: number;
  }[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.ships = [];
    this.types = [];
    this.fetchFleet.getOrgShipsList(this.orgId).subscribe((response) => {
      if (response.length > 0) this.fleetEmpty = false;
      this.sortShips(response);
      this.data = true;
    });
  }

  sortShips(ships: Ship[]) {
    for (let ship of ships) {
      const typeIndex = this.types.findIndex((t) => t.type === ship.type);
      if (typeIndex === -1) {
        this.types.push({
          type: ship.type,
          ships: [ship],
          cargoMax: ship.cargo_capacity,
          crewMax: ship.max_crew,
          flightReady: ship.production_status === 'flight-ready' ? 1 : 0,
          shipCount: 1,
        });
      } else {
        this.types[typeIndex].ships.push(ship);
        this.types[typeIndex].cargoMax += ship.cargo_capacity;
        this.types[typeIndex].crewMax += ship.max_crew;
        this.types[typeIndex].flightReady +=
          ship.production_status === 'flight-ready' ? 1 : 0;
      }
    }

    for (let type of this.types)
      this.types.sort((a, b) => a.type.localeCompare(b.type));

    this.types.forEach((type) => {
      type.ships.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  reloadPage() {
    this.getData();
  }

  toggleHangarOnClick(value?: string) {
    if (value) {
      const valueParts = value.split('/');
      this.memberId = +valueParts[valueParts.length - 1];
    }

    this.scrollLocked = !this.scrollLocked;

    if (this.scrollLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    this.showHangar = !this.showHangar;
  }
}
