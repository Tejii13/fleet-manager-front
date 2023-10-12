import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppService } from 'src/app/in-app.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  @Input() userId!: number;
  @Input() organizationId!: number;
  @Output() showShipsChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(private route: ActivatedRoute, private inApp: InAppService) {}

  public showUpdateMembers: boolean = false;

  public showMembers: boolean = false;
  public showShips: boolean = true;
  public show: boolean = true;
  public currentView: string = 'ships';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      switch (params['view']) {
        case 'ships':
          this.currentView = 'ships';
          break;
        case 'members':
          this.currentView = 'members';
          break;
      }
    });
  }

  navigateToMembers() {
    const id = this.route.snapshot.paramMap.get('id'); // Get the 'id' parameter from the current URL
    if (id) {
      this.inApp.navigateToMembers(id);
      this.reload();
    }

    this.showShipsChange.emit(false);
  }

  navigateToShips() {
    const id = this.route.snapshot.paramMap.get('id'); // Get the 'id' parameter from the current URL
    if (id) {
      this.inApp.navigateToShips(id);
      this.reload();
    }

    this.showShipsChange.emit(true);
  }

  reload() {
    console.log(this.currentView);
    this.show = false;
    setTimeout(() => (this.show = true));
  }

  updateMembers() {
    this.showUpdateMembers = !this.showUpdateMembers;
  }
}
