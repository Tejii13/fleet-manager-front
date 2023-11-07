import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppService } from 'src/app/in-app.service';
import { Ship, ShipData } from 'src/app/interfaces';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  @Input() userId!: number;
  @Input() ships!: ShipData[];
  @Input() fleet!: Ship[];
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
        case 'overview':
          this.currentView = 'overview';
          break;
        case 'organization':
          this.currentView = 'organization';
          break;
        default:
          this.currentView = 'ships';
      }
    });
  }

  reload() {
    this.show = false;
    setTimeout(() => (this.show = true));
  }
}
