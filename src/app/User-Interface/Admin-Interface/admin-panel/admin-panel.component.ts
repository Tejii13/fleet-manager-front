import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  @Input() userId!: number;
  @Input() organizationId!: number;
  @Output() showShipsChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public showMembers: boolean = false;
  public showShips: boolean = true;

  viewMembers() {
    this.showMembers = true;
    this.showShips = false;
    this.showShipsChange.emit(this.showShips);
    console.log(this.organizationId);
  }

  viewShips() {
    this.showShips = true;
    this.showMembers = false;
    this.showShipsChange.emit(this.showShips);
  }
}
