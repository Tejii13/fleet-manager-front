import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FetchFleetDataService } from 'src/app/fetch-fleet-data.service';
import { Ship } from 'src/app/interfaces';

@Component({
  selector: 'app-member-hangar-display',
  templateUrl: './member-hangar-display.component.html',
  styleUrls: ['./member-hangar-display.component.scss'],
})
export class MemberHangarDisplayComponent implements OnInit {
  @Input() userId!: number;
  @Output() toggleHangarDisplay = new EventEmitter<void>();

  constructor(private fetchFleetData: FetchFleetDataService) {}

  public ships: Ship[] = [];
  public responseReceived: boolean = false;

  public fleetEmpty: boolean = false;

  ngOnInit(): void {
    this.fetchFleetData.getShipInfo(this.userId).subscribe((response) => {
      if (response.length === 0) {
        this.fleetEmpty = true;
      }
      this.ships = response;
      this.responseReceived = true;
    });
  }

  exitHangarView() {
    this.toggleHangarDisplay.emit();
  }
}
