import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ship, ShipData } from 'src/app/interfaces';

import { FormGroup, FormBuilder } from '@angular/forms';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-ships',
  templateUrl: './search-ships.component.html',
  styleUrls: ['./search-ships.component.scss'],
})
export class SearchShipsComponent implements OnInit {
  @Input() userId!: number;
  @Input() username!: string;
  @Input() isAdmin!: boolean;
  @Input() ships!: ShipData[];
  @Input() fleet!: Ship[];
  @Input() fleetEmpty!: boolean;
  @Input() orgId!: number;
  @Output() getFleetData = new EventEmitter<void>();

  public shipForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.shipForm = this.formBuilder.group({
      shipInput: '',
    });
  }

  reloadShipsDisplay: Subject<boolean> = new Subject<boolean>();

  public filteredBrands: any[] = [];
  public staticBrands = new Map();

  public showShipAddPopup: boolean = false;

  private brandName!: string;

  public shipToPass!: ShipData;

  public type: { type: string; ships: ShipData[] }[] = [];

  ngOnInit(): void {
    this.sortByBrand();
  }

  private sortByBrand() {
    // Sort brands by alphabetical order
    this.ships.sort((a, b) =>
      a.manufacturer.name.localeCompare(b.manufacturer.name)
    );

    // Sort ships by alphabetical order
    this.ships.sort((a, b) => a.name.localeCompare(b.name));

    for (let ship of this.ships) {
      if (ship) {
        this.brandName = ship.manufacturer.name;
        if (this.staticBrands.get(this.brandName)) {
          this.staticBrands.get(this.brandName).push(ship.name);
          this.staticBrands.set(
            this.brandName,
            this.staticBrands.get(this.brandName)
          );
        } else {
          this.staticBrands.set(this.brandName, [ship.name]);
        }
      }
    }
  }

  filterShips(value: string) {
    const filterValue = (value ?? '').toLowerCase();

    const filteredBrands: { key: string; value: any[] }[] = [];

    this.staticBrands.forEach((ships: string[], brandName: string) => {
      const filteredNames = ships.filter((ship) =>
        ship.toLowerCase().includes(filterValue)
      );

      if (filteredNames.length > 0) {
        filteredBrands.push({
          key: brandName,
          value: filteredNames,
        });
      }
    });

    return filteredBrands;
  }

  onInput() {
    this.filteredBrands = this.filterShips(
      this.shipForm.get('shipInput')?.value
    );
  }

  toggleShipAddPopup() {
    this.showShipAddPopup = true;

    const shipToAdd = this.shipForm.get('shipInput')?.value;
    this.shipForm.reset();
    for (let ship of this.ships) {
      if (ship.name.toLowerCase() === shipToAdd.toLowerCase()) {
        this.shipToPass = ship;
        console.log(this.shipToPass);
      }
    }

    document.body.style.overflow = 'hidden';
  }

  cancelAdd() {
    this.showShipAddPopup = false;
    document.body.style.overflow = 'auto';
  }

  nextReloadShipList() {
    this.reloadShipsDisplay.next(true);
  }

  emit() {
    console.log('Emit');
    this.getFleetData.emit();
  }
}
