import { Component } from '@angular/core';

@Component({
  selector: 'app-search-ships',
  templateUrl: './search-ships.component.html',
  styleUrls: ['./search-ships.component.scss'],
})
export class SearchShipsComponent {
  shipInput!: string;

  handleShipAdd() {
    console.log('Clicked!');
  }
}
