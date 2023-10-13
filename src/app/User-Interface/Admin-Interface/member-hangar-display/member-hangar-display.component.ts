import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FetchFleetService } from 'src/app/fetch-fleet.service';
import { Ship } from 'src/app/interfaces';

@Component({
  selector: 'app-member-hangar-display',
  templateUrl: './member-hangar-display.component.html',
  styleUrls: ['./member-hangar-display.component.scss'],
})
export class MemberHangarDisplayComponent implements OnInit {
  @Input() userId!: number;
  @Output() toggleHangarDisplay = new EventEmitter<void>();

  constructor(private fetchFleet: FetchFleetService) {}

  public ships: Ship[] = [];
  public responseReceived: boolean = false;

  ngOnInit(): void {
    console.log(this.userId);
    this.fetchFleet.getShipInfo(this.userId).subscribe((response) => {
      this.ships = response;
      this.responseReceived = true;
    });
  }

  exitHangarView() {
    this.toggleHangarDisplay.emit();
  }
}
