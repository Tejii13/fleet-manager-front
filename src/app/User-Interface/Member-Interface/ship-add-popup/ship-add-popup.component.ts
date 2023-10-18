import { FetchFleetService } from 'src/app/fetch-fleet.service';
import { Ship } from 'src/app/interfaces';
import { ShipData } from './../../../interfaces';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ship-add-popup',
  templateUrl: './ship-add-popup.component.html',
  styleUrls: ['./ship-add-popup.component.scss'],
})
export class ShipAddPopupComponent implements OnInit {
  @Input() shipToHandle!: ShipData;
  @Input() fleet!: Ship[];
  @Input() username!: string;
  @Input() userId!: number;

  @Output() cancelShipAdd: EventEmitter<void> = new EventEmitter<void>();
  @Output() reloadShipsDisplay: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private handleShips: FetchFleetService) {}

  public isLoaner: boolean = false;

  public canBeLoanerFor: Ship[] = [];

  public bannerUrl!: string;
  public obtentionMethod: string = 'null';
  public nickname!: string;
  public loanerFor: string = '';
  public fieldsAreValid: boolean = true;

  ngOnInit(): void {
    if (this.shipToHandle) {
      this.bannerUrl = this.shipToHandle.media[0].images.banner;
      if (!this.bannerUrl.startsWith('https://media')) {
        this.bannerUrl = 'https://robertsspaceindustries.com' + this.bannerUrl;
      }
    }
  }

  getObtention() {
    if (this.obtentionMethod === 'loaner') {
      this.isLoaner = true;
      this.getPledgeShipList();
    } else {
      this.isLoaner = false;
    }
  }

  onLoanerSelectChange() {
    console.log(this.loanerFor);
  }

  getPledgeShipList() {
    for (let ship of this.fleet) {
      if (
        ship.obtention_method === 'pledge' &&
        ship.production_status !== 'flight-ready'
      )
        this.canBeLoanerFor.push(ship);
    }
    console.log(this.canBeLoanerFor);
  }

  cancel() {
    this.cancelShipAdd.emit();
  }

  handleAddButton() {
    if (
      this.obtentionMethod !== 'null' &&
      ((this.obtentionMethod === 'loaner' && this.loanerFor) ||
        this.obtentionMethod !== 'loaner')
    ) {
      this.fieldsAreValid = true;
      this.handleNullValues();
    } else {
      this.fieldsAreValid = false;
    }
  }

  handleNullValues() {
    let shipName;
    if (this.shipToHandle.name.includes('Best In Show Edition')) {
      shipName = this.shipToHandle.name.replace('Best In Show Edition', 'BIS');
    } else {
      shipName = this.shipToHandle.name;
    }

    let maxCrew;
    if (!this.shipToHandle.max_crew) {
      maxCrew = 0;
    } else {
      maxCrew = this.shipToHandle.max_crew;
    }

    let shipSize;
    if (!this.shipToHandle.size) {
      shipSize = 'TBD';
    } else {
      shipSize = this.shipToHandle.size;
    }

    let shipScu;
    if (!this.shipToHandle.cargocapacity) {
      shipScu = 0;
    } else {
      shipScu = this.shipToHandle.cargocapacity;
    }
    let shipUrl;
    shipUrl = 'https://robertsspaceindustries.com' + this.shipToHandle.url;

    this.handleShipAdd(shipName, maxCrew, shipSize, shipScu, shipUrl);
  }

  handleShipAdd(
    shipName: string,
    maxCrew: number,
    shipSize: string,
    shipScu: number,
    shipUrl: string
  ) {
    this.handleShips
      .saveShip(
        this.userId,
        shipName,
        this.nickname,
        shipSize,
        this.shipToHandle.production_status,
        this.shipToHandle.manufacturer.name,
        this.shipToHandle.focus,
        maxCrew,
        shipUrl,
        this.shipToHandle.description,
        this.bannerUrl,
        shipScu,
        this.shipToHandle.type,
        this.username,
        this.obtentionMethod,
        this.loanerFor
      )
      .subscribe((response) => {
        if (response) {
          console.log(response);
          this.reloadShipsDisplay.emit(true);
          this.cancelShipAdd.emit();
        }
      });
  }
}
