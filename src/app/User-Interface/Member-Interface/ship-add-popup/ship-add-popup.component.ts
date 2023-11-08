import { catchError } from 'rxjs';
import { FetchFleetDataService } from 'src/app/fetch-fleet-data.service';
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

  constructor(private fetchFleetData: FetchFleetDataService) {}

  public isLoaner: boolean = false;
  public fieldsAreValid: boolean = true;
  public isFetching: boolean = false;

  public canBeLoanerFor: Ship[] = [];

  public bannerUrl!: string;
  public obtentionMethod: string = 'default';
  public nickname!: string;
  public loanerFor: string = '';

  public serverErrorOcurred: boolean = false;

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

  onLoanerSelectChange() {}

  getPledgeShipList() {
    for (let ship of this.fleet) {
      if (
        ship.obtention_method === 'pledge' &&
        ship.production_status !== 'flight-ready'
      )
        this.canBeLoanerFor.push(ship);
    }
  }

  cancel() {
    this.cancelShipAdd.emit();
  }

  handleAddButton() {
    if (
      this.obtentionMethod !== 'default' &&
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
    this.isFetching = true;
    let newNickname = this.nickname;
    if (this.nickname) {
      newNickname = this.nickname.toUpperCase().replaceAll(' ', '-');
    }

    const requestBody = {
      owner: `api/users/${this.userId}`,
      name: shipName,
      nickname: newNickname,
      size: shipSize,
      productionStatus: this.shipToHandle.production_status,
      manufacturer: this.shipToHandle.manufacturer.name,
      focus: this.shipToHandle.focus,
      maxCrew: maxCrew,
      url: shipUrl,
      description: this.shipToHandle.description,
      imageUrl: this.bannerUrl,
      cargoCapacity: shipScu,
      type: this.shipToHandle.type,
      ownerUsername: this.username,
      obtentionMethod: this.obtentionMethod,
      loanerFor: this.loanerFor,
    };

    try {
      this.fetchFleetData.saveShip(requestBody).subscribe(
        (response) => {
          if (response) {
            this.isFetching = false;
            this.reloadShipsDisplay.emit(true);
            this.cancelShipAdd.emit();
          } else {
            this.serverErrorOcurred = true;
            this.isFetching = false;
          }
        },
        (error) => {
          console.error('Erreur: ' + error);
          this.serverErrorOcurred = true;
          this.isFetching = false;
        }
      );
    } catch {
      this.serverErrorOcurred = true;
      this.isFetching = false;
    }
  }
}
