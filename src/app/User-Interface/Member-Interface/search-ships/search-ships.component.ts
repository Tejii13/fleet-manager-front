import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ShipData } from 'src/app/interfaces';

import { FormGroup, FormBuilder } from '@angular/forms';

import { StarCitizenApiService } from 'src/app/star-citizen-api.service';
import { FetchFleetService } from 'src/app/fetch-fleet.service';

@Component({
  selector: 'app-search-ships',
  templateUrl: './search-ships.component.html',
  styleUrls: ['./search-ships.component.scss'],
})
export class SearchShipsComponent implements OnInit {
  public shipForm: FormGroup;

  constructor(
    private scApi: StarCitizenApiService,
    private handleShips: FetchFleetService,
    private formBuilder: FormBuilder
  ) {
    this.shipForm = this.formBuilder.group({
      shipInput: '',
    });
  }

  public isFetching: boolean = true;

  public ships!: ShipData[];
  public filteredBrands: any[] = [];
  public staticBrands = new Map();

  private brandName!: string;

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.isFetching = true;
    this.scApi.fetchAllShips().subscribe(
      (response: Array<ShipData>) => {
        this.isFetching = false;
        if (response && response.length !== 0) {
          console.log('Received Ship Data:', response);
          this.ships = response.filter((ship) => ship !== null);
          this.sortByBrand();
        } else {
          console.log('There is no ship to display here');
        }
      },
      (error) => {
        console.error('Error while fetching ship information:', error);
      }
    );
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

    console.log(filteredBrands);
    return filteredBrands;
  }

  onInput() {
    this.filteredBrands = this.filterShips(
      this.shipForm.get('shipInput')?.value
    );
  }

  handleShipAdd() {
    console.log('Clicked!');
    const shipToAdd = this.shipForm.get('shipInput')?.value;
    console.log('ShipName: ' + shipToAdd);
    this.handleShips.saveShip(62, shipToAdd, 4).subscribe();
  }
}
