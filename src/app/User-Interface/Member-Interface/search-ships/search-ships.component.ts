import { Component, OnInit } from '@angular/core';

import { ShipData } from 'src/app/interfaces';

import { FormGroup, FormBuilder } from '@angular/forms';

import { StarCitizenApiService } from 'src/app/star-citizen-api.service';

@Component({
  selector: 'app-search-ships',
  templateUrl: './search-ships.component.html',
  styleUrls: ['./search-ships.component.scss'],
})
export class SearchShipsComponent implements OnInit {
  public shipForm: FormGroup;

  constructor(
    private scApi: StarCitizenApiService,
    private formBuilder: FormBuilder
  ) {
    this.shipForm = this.formBuilder.group({
      shipInput: '',
    });
  }

  public isFetching: boolean = true;

  public ships!: ShipData[];
  public filteredBrands: { key: string; value: string[] }[] = [];
  public workingBrands: { key: string; value: string[] }[] = [];

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
          this.ships = response;
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
    this.filteredBrands = [];

    for (let ship of this.ships) {
      if (ship) {
        const brandName = ship.manufacturer.name;

        const brand = this.filteredBrands.find((b) => b.key === brandName);

        if (brand) {
          brand.value.push(ship.name);
          brand.value.sort();
        } else {
          this.filteredBrands.push({
            key: brandName,
            value: [ship.name],
          });
        }
      }
    }
    this.filteredBrands.sort((a, b) => a.key.localeCompare(b.key));

    console.log(this.filteredBrands);
  }

  // FIXME Finish it
  filterShips(value: string) {
    const filterValue = (value ?? '').toLowerCase();
    let brandName: string;

    this.filteredBrands.forEach((brand: { key: string; value: string[] }) => {
      const filteredNames = brand.value.filter((shipName) =>
        shipName.toLowerCase().includes(filterValue)
      );

      if (filteredNames.length > 0) {
        this.filteredBrands.push({
          key: brandName,
          value: filteredNames,
        });
      }
    });

    return this.filteredBrands;
  }

  onInput() {
    const value = this.shipForm.get('shipInput')?.value;
    this.workingBrands = this.filterShips(value);
    console.log(this.workingBrands);
  }

  handleShipAdd() {
    console.log('Clicked!');
  }
}
