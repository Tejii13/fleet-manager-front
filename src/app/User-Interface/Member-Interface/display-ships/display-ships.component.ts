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

  @Input() reloadShipsDisplay: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fetchData: FetchDataService,
    private fetchFleet: FetchFleetService
  ) {}

  public ships: Ship[] = [];
  public firstRender: boolean = true;

  public shipNameChanges: { [shipId: number]: string } = {};
  public shipNameChangeIsReadOnly: boolean = true;

  public shipToChange!: number | null;
  public show: boolean = true;

  ngOnInit(): void {
    if (this.firstRender) {
      console.log(this.firstRender);
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

  handleEdit(shipId: number) {
    this.shipToChange = shipId;
    this.reload();
  }

  handleCheck(shipId: number) {
    this.shipToChange = null;
    this.reload();
    this.shipNameChangeIsReadOnly = true;
    const modifiedName = this.shipNameChanges[shipId];
    if (modifiedName !== undefined) {
      const shipIndex = this.ships.findIndex((ship) => ship.id === shipId);
      if (shipIndex !== -1) {
        this.ships[shipIndex].nickname = modifiedName;
        // TODO send info to the server here
      }
    }
  }

  reload() {
    this.show = false;
    setTimeout(() => (this.show = true));
  }
}
