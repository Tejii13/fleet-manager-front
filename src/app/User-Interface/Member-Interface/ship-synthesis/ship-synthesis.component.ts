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

  public shipToRemove!: number | null;
  public show: boolean = true;

  public types: {
    type: string;
    ships: Ship[];
    cargoMax: number;
    crewMax: number;
    flightReady: number;
    shipCount: number;
  }[] = [];

  ngOnInit(): void {
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

  deleteShip(shipId: number) {
    this.shipToRemove = shipId;
    console.log(shipId);
    if (shipId) {
      this.fetchFleet.deleteShip(shipId).subscribe(() => {
        this.getFleetData.emit();
      });
    }
  }

  reload() {
    this.show = false;
    setTimeout(() => (this.show = true));
  }
}
