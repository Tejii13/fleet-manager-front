import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  public showMembers: boolean = false;
  public showUpdateMembers: boolean = false;
  public showShips: boolean = true;

  updateMembers() {
    this.showUpdateMembers = true;
    this.showMembers = false;
    this.showShips = false;
  }

  viewMembers() {
    this.showMembers = true;
    this.showUpdateMembers = false;
    this.showShips = false;
  }

  viewShips() {
    this.showShips = true;
    this.showMembers = false;
    this.showUpdateMembers = false;
  }
}
