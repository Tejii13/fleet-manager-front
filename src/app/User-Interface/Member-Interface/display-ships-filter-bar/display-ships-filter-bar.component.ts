import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Ship } from 'src/app/interfaces';

@Component({
  selector: 'app-display-ships-filter-bar',
  templateUrl: './display-ships-filter-bar.component.html',
  styleUrls: ['./display-ships-filter-bar.component.scss'],
})
export class DisplayShipsFilterBarComponent implements OnInit {
  @Input() fleetEmpty!: boolean;
  @Input() ships: Ship[] = [];
  @Output() actualizedShips: EventEmitter<Ship[]> = new EventEmitter<Ship[]>();

  public sortByNameValue: string = '';
  public sortByObtMethodValue: string = 'hidden';
  public sortByOrderValue: string = 'hidden';
  public sortByManufacturerValue: string = 'hidden';

  public brands: string[] = [];

  public sortedShips: Ship[] = [];
  public sortedShipsByName: Ship[] = [];
  public sortedShipsByObtMethod: Ship[] = [];
  public sortedShipsByBrand: Ship[] = [];
  public sortedShipsByOrder: Ship[] = [];

  ngOnInit(): void {
    this.sortedShips = this.ships;
    this.getBrands();
  }

  getBrands() {
    // Set each brand one time in the brands Array
    const uniqueBrands: Set<string> = new Set();

    for (let ship of this.sortedShips) {
      const manufacturer = ship.manufacturer.toLowerCase();
      if (!uniqueBrands.has(manufacturer)) {
        uniqueBrands.add(manufacturer);
      }
    }

    this.brands = Array.from(uniqueBrands).sort();
  }

  // Populates the sortedShipsByName array with names set in the input by the user
  sortShipsByName() {
    this.sortedShipsByName = [];

    const shipName = this.sortByNameValue;

    for (let shipToSort of this.sortedShips) {
      if (
        shipToSort.name.toLowerCase().includes(shipName.toLowerCase()) ||
        shipToSort.nickname
          ?.toLocaleLowerCase()
          .includes(shipName.toLowerCase())
      ) {
        this.sortedShipsByName.push(shipToSort);
      }
    }

    this.getBrands();
    this.actualizedShips.emit(this.sortedShipsByName);
  }

  // Populates the sortedShipsByOptMethod array with the ships obtained in a certain way
  sortShipsByObtentionMethod() {
    this.sortedShipsByObtMethod = [];
    this.sortByOrderValue = 'hidden';
    this.sortByNameValue = '';

    const obtMethod = this.sortByObtMethodValue;

    switch (obtMethod) {
      case 'pledge':
        for (let shipToSort of this.ships) {
          if (shipToSort.obtention_method === 'pledge') {
            this.sortedShipsByObtMethod.push(shipToSort);
          }
        }
        break;
      case 'In game':
        for (let shipToSort of this.ships) {
          if (shipToSort.obtention_method === 'In game') {
            this.sortedShipsByObtMethod.push(shipToSort);
          }
        }
        break;
      case 'loaners':
        for (let shipToSort of this.ships) {
          if (shipToSort.obtention_method === 'loaner') {
            this.sortedShipsByObtMethod.push(shipToSort);
          }
        }
        break;
      case 'rentals':
        for (let shipToSort of this.ships) {
          if (shipToSort.obtention_method === 'rental') {
            this.sortedShipsByObtMethod.push(shipToSort);
          }
        }
        break;
      case 'subscription':
        for (let shipToSort of this.ships) {
          if (shipToSort.obtention_method === 'subscription') {
            this.sortedShipsByObtMethod.push(shipToSort);
          }
        }
        break;
      case 'referral':
        for (let shipToSort of this.ships) {
          if (shipToSort.obtention_method === 'referral') {
            this.sortedShipsByObtMethod.push(shipToSort);
          }
        }
        break;
    }

    this.fuseSortedShipTables();
  }

  // Populates the sortedShipsByBrand array with the ships of a certain brand
  sortShipsByBrand() {
    this.sortedShipsByBrand = [];
    this.sortByOrderValue = 'hidden';
    this.sortByNameValue = '';

    const shipBrand = this.sortByManufacturerValue;

    for (let shipToSort of this.ships) {
      if (shipToSort.manufacturer.toLowerCase() === shipBrand.toLowerCase()) {
        this.sortedShipsByBrand.push(shipToSort);
      }
    }

    this.fuseSortedShipTables();
  }

  fuseSortedShipTables() {
    this.sortedShips = [];

    if (this.sortedShipsByObtMethod.length === 0) {
      this.sortedShipsByObtMethod = this.ships;
    }

    if (this.sortedShipsByBrand.length === 0) {
      this.sortedShipsByBrand = this.ships;
    }

    for (let shipToSort of this.ships) {
      if (
        this.sortedShipsByObtMethod.includes(shipToSort) &&
        this.sortedShipsByBrand.includes(shipToSort)
      ) {
        this.sortedShips.push(shipToSort);
      }
    }

    this.getBrands();
    this.actualizedShips.emit(this.sortedShips);
  }

  resetFilters() {
    this.sortByNameValue = '';
    this.sortByObtMethodValue = 'hidden';
    this.sortByManufacturerValue = 'hidden';
    this.sortByOrderValue = 'hidden';
    this.sortedShips = this.ships;
    this.actualizedShips.emit(this.sortedShips);
  }
}
