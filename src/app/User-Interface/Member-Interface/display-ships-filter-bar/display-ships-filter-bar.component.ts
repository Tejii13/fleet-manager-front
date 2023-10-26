import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-ships-filter-bar',
  templateUrl: './display-ships-filter-bar.component.html',
  styleUrls: ['./display-ships-filter-bar.component.scss'],
})
export class DisplayShipsFilterBarComponent {
  @Input() fleetEmpty!: boolean;
  public sortByNameValue: string = '';
  public sortByObtMethodValue: string = 'default';
  public sortByOrderValue: string = 'default';
}
