import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Ship } from 'src/app/interfaces';
import { InAppService } from 'src/app/in-app.service';

@Component({
  selector: 'app-my-fleet',
  templateUrl: './my-fleet.component.html',
  styleUrls: ['./my-fleet.component.scss'],
})
export class MyFleetComponent implements OnInit {
  @Input() userId!: number;
  @Input() isAdmin!: boolean;
  @Input() reloadShipsDisplay: Subject<boolean> = new Subject<boolean>();
  @Input() ships!: Ship[];
  @Input() fleetEmpty!: boolean;
  @Input() orgId!: number;
  @Output() getFleetData = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, public inApp: InAppService) {}

  public currentView: string = 'ships';

  public show: boolean = true;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      switch (params['view']) {
        case 'synthesis':
          this.currentView = 'synthesis';
          break;
        case 'ships':
          this.currentView = 'ships';
          break;
        case 'overview':
          if (this.isAdmin) {
            this.currentView = 'overview';
          } else {
            this.currentView = 'ships';
          }
          break;
      }
    });
  }

  emit() {
    this.getFleetData.emit();
  }

  reload() {
    this.show = false;
    setTimeout(() => (this.show = true));
  }
}
