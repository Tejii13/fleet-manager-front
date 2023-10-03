import { Component, OnInit } from '@angular/core';

import { FetchDataService } from 'src/app/fetch-data.service';
import { Member, UserListResponse } from 'src/app/interfaces';

@Component({
  selector: 'app-display-members',
  templateUrl: './display-members.component.html',
  styleUrls: ['./display-members.component.scss'],
})
export class DisplayMembersComponent implements OnInit {
  constructor(private fetchData: FetchDataService) {}

  public showUpdateMembers: boolean = false;

  public members!: Member[];

  ngOnInit(): void {
    this.fetchData.getUsersList().subscribe(
      (response: UserListResponse) => {
        if (response && response['hydra:member']) {
          this.members = response['hydra:member'];
          console.log(this.members);
        } else {
          console.error('Réponse API invalide: ', response);
        }
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
  }

  cancelMemberAdd() {
    this.showUpdateMembers = false;
  }
}
