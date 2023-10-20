import { FetchFleetService } from 'src/app/fetch-fleet.service';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Ship } from 'src/app/interfaces';

@Component({
  selector: 'app-ship-synthesis',
  templateUrl: './ship-synthesis.component.html',
  styleUrls: ['./ship-synthesis.component.scss'],
})
export class ShipSynthesisComponent implements OnInit, OnChanges {
  @Input() ships!: Ship[];
  @Input() isAdmin: boolean = false;
  @Input() fleetEmpty!: boolean;
  @Input() fromAdmin: boolean = false;
  @Output() getFleetData = new EventEmitter<void>();

  constructor(private fetchFleet: FetchFleetService) {}

  public show: boolean = true;

  public shipToRemove!: number;
  public shipToRemoveName!: string;
  public showConfirmRemove: boolean = false;

  private scrollLocked: boolean = false;

  public types: {
    type: string;
    ships: Ship[];
    cargoMax: number;
    crewMax: number;
    flightReady: number;
    shipCount: number;
  }[] = [];

  ngOnInit(): void {
    console.log(this.fleetEmpty);
    this.sortShips();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ships'] && !changes['ships'].firstChange) {
      this.types = [];
      this.sortShips();
    }
  }

  sortShips() {
    for (let ship of this.ships) {
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

    this.reload();
  }

  reloadPage() {
    this.getFleetData.emit();
  }

  toggleShipRemovePopup(shipId: number, shipName: string) {
    this.handleScrollLock();
    this.shipToRemove = shipId;
    this.shipToRemoveName = shipName;
    this.showConfirmRemove = true;
  }

  handleShipRemove(removingConfirmed: boolean) {
    this.handleScrollLock();
    this.showConfirmRemove = false;
    if (removingConfirmed) {
      this.fetchFleet.deleteShip(this.shipToRemove).subscribe(() => {
        this.getFleetData.emit();
      });
    } else {
      this.shipToRemove = -1;
    }
  }

  reload() {
    this.show = false;
    setTimeout(() => (this.show = true));
  }

  handleScrollLock() {
    this.scrollLocked = !this.scrollLocked;

    if (this.scrollLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}
