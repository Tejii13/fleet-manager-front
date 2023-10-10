import { Component, Input, OnInit } from '@angular/core';

import { FetchDataService } from 'src/app/fetch-data.service';
import { Member, UserListResponse } from 'src/app/interfaces';

@Component({
  selector: 'app-display-members',
  templateUrl: './display-members.component.html',
  styleUrls: ['./display-members.component.scss'],
})
export class DisplayMembersComponent implements OnInit {
  constructor(private fetchData: FetchDataService) {}

  @Input() organizationId!: number;
  @Input() userId!: number;

  public showUpdateMembers: boolean = false;

  public members!: Member[];

  ngOnInit(): void {
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
  }

  updateMembers() {
    this.showUpdateMembers = true;
    console.log(this.organizationId);
  }

  cancelMemberAdd() {
    this.showUpdateMembers = false;
  }
}
