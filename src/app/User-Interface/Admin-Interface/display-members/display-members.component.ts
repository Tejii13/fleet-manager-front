import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { FetchDataService } from 'src/app/fetch-data.service';
import { Member } from 'src/app/interfaces';
import { UpdateAccountService } from 'src/app/update-account.service';

@Component({
  selector: 'app-display-members',
  templateUrl: './display-members.component.html',
  styleUrls: ['./display-members.component.scss'],
})
export class DisplayMembersComponent implements OnInit {
  constructor(
    private fetchData: FetchDataService,
    private updateAccount: UpdateAccountService
  ) {}

  @Input() organizationId!: number;
  @Input() userId!: number;
  public members!: Member[];
  public showUpdateMembers: boolean = false;

  public show: boolean = true;
  public showHangar: boolean = false;
  public showPasswordPopup: boolean = false;

  public memberId!: number;

  public username!: string;

  private scrollLocked: boolean = false;

  public showConfirmRemove: boolean = false;
  public elementToRemove!: number;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.fetchData.getUsersList(this.organizationId).subscribe(
      (response: any) => {
        this.members = response;
      },
      (error) => {
        console.error('Error fetching user list: ', error);
      }
    );
  }

  handleMemberRemove(removingConfirmed: boolean) {
    this.handleScrollLock();
    this.showConfirmRemove = false;
    if (removingConfirmed) {
      this.updateAccount.deleteAccount(this.elementToRemove).subscribe(() => {
        this.members = [];
        this.getData();
        this.show = false;
        setTimeout(() => (this.show = true));
      });
    }
  }

  handleConfirmRemove(elementToRemove: number, username: string) {
    this.handleScrollLock();
    this.username = username;
    this.elementToRemove = elementToRemove;
    this.showConfirmRemove = true;
  }

  updateMembers() {
    this.showUpdateMembers = true;
  }

  cancelMemberAdd() {
    this.showUpdateMembers = false;
  }

  reload() {
    this.showUpdateMembers = false;
    this.members = [];
    this.getData();
  }

  setShowPasswordPopup(value: boolean) {
    this.showPasswordPopup = value;
    setTimeout(() => (this.showPasswordPopup = false), 3500);
  }

  toggleHangarOnClick(value?: number) {
    if (value) {
      this.memberId = value;
    }

    this.handleScrollLock();

    this.showHangar = !this.showHangar;
  }

  handleScrollLock() {
    this.scrollLocked = !this.scrollLocked;

    if (this.scrollLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}
