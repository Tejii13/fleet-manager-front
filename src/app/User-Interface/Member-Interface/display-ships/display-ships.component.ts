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
import { FetchFleetService } from 'src/app/fetch-fleet.service';
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
  @Input() brands!: Map<any, any>;
  @Input() fleetEmpty!: boolean;
  @Output() getFleetData = new EventEmitter<void>();
  public shipToSortName: string = '';
  public sortBySelectValue: string = 'default';

  constructor(private fetchFleet: FetchFleetService) {}

  public isLoading: boolean = false;

  public firstRender: boolean = true;

  public shipNameChanges: { [shipId: number]: string } = {};

  public shipToRemove!: number;
  public shipToRemoveName!: string;
  public shipToChange!: number | null;

  public show: boolean = true;
  public showConfirmRemove: boolean = false;
  private scrollLocked: boolean = false;

  public sortedShips: Ship[] = [];
  public sortedShipsByObtMethod: Ship[] = [];
  public sortedShipsByName: Ship[] = [];

  ngOnInit(): void {
    console.log(this.brands);
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

    this.sortShipsByObtentionMethod(
      this.sortBySelectValue,
      this.shipToSortName
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ships'] && !changes['ships'].firstChange) {
      this.sortShipsByObtentionMethod(
        this.sortBySelectValue,
        this.shipToSortName
      );
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
      this.fetchFleet.deleteShip(this.shipToRemove).subscribe((response) => {
        console.log('Deleted');
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
        console.log(ship);
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

        this.fetchFleet.updateName(shipId, requestBody).subscribe();
      }
    }
  }

  sortShipsByObtentionMethod(obtMethod: string, shipName: string) {
    this.sortedShipsByObtMethod = [];

    switch (obtMethod) {
      case 'default':
        console.log('default');
        this.sortedShipsByObtMethod = this.ships;
        break;
      case 'pledge':
        console.log('pledge');
        for (let shipToSort of this.ships) {
          if (shipToSort.obtention_method === 'pledge') {
            this.sortedShipsByObtMethod.push(shipToSort);
          }
        }
        break;
      case 'igBuy':
        console.log('igBuy');
        for (let shipToSort of this.ships) {
          if (shipToSort.obtention_method === 'igBuy') {
            this.sortedShipsByObtMethod.push(shipToSort);
          }
        }
        break;
      case 'loaners':
        console.log('loaners');
        for (let shipToSort of this.ships) {
          if (shipToSort.obtention_method === 'loaner') {
            this.sortedShipsByObtMethod.push(shipToSort);
          }
        }
        break;
      case 'rentals':
        console.log('rentals');
        for (let shipToSort of this.ships) {
          if (shipToSort.obtention_method === 'rental') {
            this.sortedShipsByObtMethod.push(shipToSort);
          }
        }
        break;
      case 'subscription':
        console.log('subscription');
        for (let shipToSort of this.ships) {
          if (shipToSort.obtention_method === 'subscription') {
            this.sortedShipsByObtMethod.push(shipToSort);
          }
        }
        break;
      case 'referral':
        console.log('referral');
        for (let shipToSort of this.ships) {
          if (shipToSort.obtention_method === 'referral') {
            this.sortedShipsByObtMethod.push(shipToSort);
          }
        }
        break;
    }

    this.sortShipsByName(shipName);
    this.fuseSortedShipTables();
  }

  sortShipsByName(shipName: string) {
    this.sortedShipsByName = [];

    for (let shipToSort of this.ships) {
      if (
        shipToSort.name.toLowerCase().includes(shipName.toLowerCase()) ||
        shipToSort.nickname
          ?.toLocaleLowerCase()
          .includes(shipName.toLowerCase()) ||
        // FIXME Remove it when dedicated function enabled
        shipToSort.manufacturer.toLowerCase().includes(shipName.toLowerCase())
        // Remove until here
      ) {
        this.sortedShipsByName.push(shipToSort);
      }
    }
  }

  // TODO Add dedicated function to brands later
  // sortShipsByBrand(shipBrand: string) {}

  fuseSortedShipTables() {
    this.sortedShips = [];

    if (this.shipToSortName !== '') {
      for (let ship of this.sortedShipsByName) {
        if (this.sortedShipsByObtMethod.includes(ship)) {
          this.sortedShips.push(ship);
        }
      }
    }
    for (let ship of this.sortedShipsByObtMethod) {
      if (
        (this.sortedShipsByName.includes(ship) || this.shipToSortName === '') &&
        !this.sortedShips.includes(ship)
      ) {
        this.sortedShips.push(ship);
      }
    }
  }

  reload() {
    console.log('reload');
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
