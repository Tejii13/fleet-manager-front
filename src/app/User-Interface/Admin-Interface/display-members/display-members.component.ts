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
  @Input() showUpdateMembers!: boolean;
  @Output() updateMembersAfterAdd: EventEmitter<void> =
    new EventEmitter<void>();

  public members!: Member[];
  public show: boolean = true;
  public showHangar: boolean = false;

  public memberId!: number;

  private scrollLocked: boolean = false;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.fetchData.getUsersList(this.organizationId).subscribe(
      (response: any) => {
        this.members = response;
        console.log(this.members);
      },
      (error) => {
        console.error('Error fetching user list: ', error);
      }
    );
  }

  handleMemberRemove(userId: number) {
    console.log('Delete user: ' + userId);
    this.updateAccount.deleteAccount(userId).subscribe(() => {
      this.members = [];
      this.getData();
      this.show = false;
      setTimeout(() => (this.show = true));
    });
  }

  updateMembers() {
    this.showUpdateMembers = true;
    console.log(this.organizationId);
  }

  cancelMemberAdd() {
    this.showUpdateMembers = false;
  }

  reload() {
    this.updateMembersAfterAdd.emit();
    this.members = [];
    this.getData();
  }

  toggleHangarOnClick(value?: number) {
    if (value) {
      this.memberId = value;
    }

    this.scrollLocked = !this.scrollLocked;

    if (this.scrollLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    this.showHangar = !this.showHangar;
  }
}
