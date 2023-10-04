import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FetchDataService } from 'src/app/fetch-data.service';
import { FetchFleetService } from 'src/app/fetch-fleet.service';
import { Member, Ship } from 'src/app/interfaces';

@Component({
  selector: 'app-display-ships',
  templateUrl: './display-ships.component.html',
  styleUrls: ['./display-ships.component.scss'],
})
export class DisplayShipsComponent implements OnInit {
  @Input() userId!: number;
  @Input() isAdmin!: boolean;
  @Input() reloadShipsDisplay: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fetchData: FetchDataService,
    private fetchFleet: FetchFleetService
  ) {}

  public fleetEmpty: boolean = true;
  public panelOpenState = false;
  public ships: Ship[] = [];
  public firstRender: boolean = true;

  public shipNameChanges: { [shipId: number]: string } = {};
  // public shipNameChangeIsReadOnly: boolean = true;

  public shipToChange!: number | null;
  public show: boolean = true;

  ngOnInit(): void {
    if (this.firstRender) {
      this.firstRender = false;
      this.getData();
    }
    this.reloadShipsDisplay.subscribe((response) => {
      if (response) {
        this.getData();
      }
    });
  }

  getData() {
    if (this.userId) {
      this.fetchFleet.getShipInfo(this.userId).subscribe((response) => {
        this.ships = [];
        this.ships = response;
        if (this.ships.length > 0) {
          this.fleetEmpty = false;
        } else {
          this.fleetEmpty = true;
        }
        console.log(this.ships);
      });
    }
  }

  handleShipRemove(shipId: number) {
    console.log(shipId);
    if (shipId) {
      this.fetchFleet.deleteShip(shipId).subscribe(() => this.getData());
    }
  }

  handleEdit(event: Event, shipId: number) {
    event.preventDefault();
    this.shipToChange = shipId;
  }

  handleCancel() {
    this.shipToChange = null;
  }

  handleCheck(shipId: number) {
    this.shipToChange = null;
    this.reload();
    // this.shipNameChangeIsReadOnly = true;
    const modifiedName = this.shipNameChanges[shipId].toUpperCase();
    if (modifiedName !== undefined) {
      const shipIndex = this.ships.findIndex((ship) => ship.id === shipId);
      const ship = this.ships.find((ship) => ship.id === shipId);
      if (shipIndex !== -1 && ship) {
        console.log(ship);
        this.ships[shipIndex].nickname = modifiedName;
        // let loadouts: string[];
        // if (ship.loadout && ship.loadout.length > 0) {
        //   loadouts = ship.loadout;
        // } else {
        //   loadouts = [];
        // }
        this.fetchFleet
          .updateName(
            shipId,
            ship.owner,
            ship.name,
            modifiedName,
            ship.size,
            ship.production_status,
            ship.manufacturer,
            ship.type,
            ship.max_crew,
            ship.url,
            ship.description,
            ship.imageUrl,
            ship.cargoCapacity
          )
          .subscribe();
      }
    }
  }

  reload() {
    console.log('reload');
    this.show = false;
    setTimeout(() => (this.show = true));
  }
}
