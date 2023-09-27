import { Component, Input, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/fetch-data.service';
import { FetchFleetService } from 'src/app/fetch-fleet.service';
import { Member, Ship } from 'src/app/interfaces';

@Component({
  selector: 'app-display-ships',
  templateUrl: './display-ships.component.html',
  styleUrls: ['./display-ships.component.scss'],
})
export class DisplayShipsComponent implements OnInit {
  @Input() userId!: number;

  constructor(
    private fetchData: FetchDataService,
    private fetchFleet: FetchFleetService
  ) {}

  public ships: Ship[] = [];

  private shipsLinks!: string[];

  ngOnInit(): void {
    if (this.userId) {
      this.fetchData.getUserinfo(this.userId).subscribe(
        (response: Member) => {
          console.log(response);
          if (response) {
            console.log(response);
            if (response.ships.length > 0) {
              this.shipsLinks = response.ships;
              for (let shipLink of this.shipsLinks) {
                this.fetchFleet
                  .getShipInfo(shipLink)
                  .subscribe((shipData: Ship) => {
                    console.log(shipData.name);
                    this.ships.push(shipData);
                    console.log(shipLink);
                    console.log(this.ships);
                  });
              }
            }
          }
        },
        (error) => {
          console.error('Error fetching ships list: ', error);
        }
      );
    }
  }
}
