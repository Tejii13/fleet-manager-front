import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FetchFleetService } from 'src/app/fetch-fleet.service';
import { Ship } from 'src/app/interfaces';

@Component({
  selector: 'app-display-ships',
  templateUrl: './display-ships.component.html',
  styleUrls: ['./display-ships.component.scss'],
})
export class DisplayShipsComponent implements OnInit {
  @Input() userId!: number;
  @Input() isAdmin!: boolean;
  @Input() reloadShipsDisplay: Subject<boolean> = new Subject<boolean>();
  @Input() ships!: Ship[];
  @Input() fleetEmpty!: boolean;
  @Output() getFleetData = new EventEmitter<void>();

  constructor(private fetchFleet: FetchFleetService) {}

  public isLoading: boolean = false;

  public panelOpenState = false;
  public firstRender: boolean = true;

  public shipNameChanges: { [shipId: number]: string } = {};

  public shipToRemove!: number | null;
  public shipToChange!: number | null;

  public show: boolean = true;

  ngOnInit(): void {
    if (this.firstRender) {
      this.firstRender = false;
      this.getFleetData.emit();
      console.log('Emit');
    }
    this.reloadShipsDisplay.subscribe((response) => {
      if (response) {
        console.log('Emit');
        this.getFleetData.emit();
      }
    });
  }

  handleShipRemove(shipId: number) {
    this.shipToRemove = shipId;
    console.log(shipId);
    if (shipId) {
      this.fetchFleet.deleteShip(shipId).subscribe(() => {
        this.getFleetData.emit();
      });
    }
  }

  handleEdit(event: Event, shipId: number) {
    event.preventDefault();
    this.shipToChange = shipId;
  }

  handleCancel() {
    this.isLoading = false;
    this.shipToChange = null;
  }

  handleCheck(shipId: number) {
    this.shipToChange = null;
    this.reload();
    const modifiedName = this.shipNameChanges[shipId].toUpperCase();
    if (modifiedName !== undefined) {
      const shipIndex = this.ships.findIndex((ship) => ship.id === shipId);
      const ship = this.ships.find((ship) => ship.id === shipId);
      if (shipIndex !== -1 && ship) {
        console.log(ship);
        this.ships[shipIndex].nickname = modifiedName;
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
            ship.cargoCapacity,
            ship.focus
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
