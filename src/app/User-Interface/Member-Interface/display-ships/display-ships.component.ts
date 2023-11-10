import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { FetchFleetDataService } from 'src/app/fetch-fleet-data.service';
import { Ship } from 'src/app/interfaces';

@Component({
  selector: 'app-display-ships',
  templateUrl: './display-ships.component.html',
  styleUrls: ['./display-ships.component.scss'],
})
export class DisplayShipsComponent implements OnInit, OnChanges {
  @Input() userId!: number;
  @Input() isAdmin!: boolean;
  @Input() reloadShipsDisplay: Subject<boolean> = new Subject<boolean>();
  @Input() ships!: Ship[];
  @Input() fleetEmpty!: boolean;
  @Output() getFleetData = new EventEmitter<void>();
  public shipToSortName: string = '';
  public sortBySelectValue: string = 'default';

  constructor(private fetchFleetData: FetchFleetDataService) {}

  public isLoading: boolean = false;

  public firstRender: boolean = true;

  public shipNameChanges: { [shipId: number]: string } = {};

  public shipToRemove!: number;
  public shipToRemoveName!: string;
  public shipToChange!: number | null;

  public sortedShips!: Ship[];

  public show: boolean = true;
  public showConfirmRemove: boolean = false;
  private scrollLocked: boolean = false;

  ngOnInit(): void {
    this.sortedShips = this.ships;
    if (this.firstRender) {
      this.firstRender = false;
      this.getFleetData.emit();
    }
    this.reloadShipsDisplay.subscribe((response) => {
      if (response) {
        this.getFleetData.emit();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ships'] && !changes['ships'].firstChange) {
      this.sortedShips = this.ships;
    }
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
      this.fetchFleetData
        .deleteShip(this.shipToRemove)
        .subscribe((response) => {
          this.getFleetData.emit();
        });
    } else {
      this.shipToRemove = -1;
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
    const modifiedName = this.shipNameChanges[shipId]
      .toUpperCase()
      .replaceAll(' ', '-');
    if (modifiedName !== undefined) {
      const shipIndex = this.ships.findIndex((ship) => ship.id === shipId);
      const ship = this.ships.find((ship) => ship.id === shipId);
      if (shipIndex !== -1 && ship) {
        this.ships[shipIndex].nickname = modifiedName;

        const requestBody = {
          owner: ship.owner,
          name: ship.name,
          nickname: modifiedName,
          size: ship.size,
          productionStatus: ship.production_status,
          manufacturer: ship.manufacturer,
          type: ship.type,
          loadout: ship.loadout,
          focus: ship.focus,
          maxCrew: ship.max_crew,
          url: ship.url,
          description: ship.description,
          imageUrl: ship.imageUrl,
          cargoCapacity: ship.cargo_capacity,
          ownerUsername: ship.owner_username,
          obtentionMethod: ship.obtention_method,
          loanerFor: ship.loaner_for,
        };

        this.fetchFleetData.updateName(shipId, requestBody).subscribe();
      }
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

  actualizeShips(sortedShips: Ship[]) {
    this.sortedShips = sortedShips;
  }
}
