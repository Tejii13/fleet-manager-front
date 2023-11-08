import { Component, Input, OnInit } from '@angular/core';
import { FetchOrganizationDataService } from 'src/app/fetch-organization-data.service';
import { Organization } from 'src/app/interfaces';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  @Input() orgId!: number;

  public isFetchingOrgData: boolean = true;

  constructor(private fetchOrgData: FetchOrganizationDataService) {}

  public orgData!: Organization;

  public errorWhileRecoveringData: boolean = false;

  ngOnInit(): void {
    this.fetchOrgData.getOrgInformation(this.orgId).subscribe((data) => {
      console.log(data);
      if (data) {
        this.orgData = data;
        this.isFetchingOrgData = false;
      } else {
        this.isFetchingOrgData = false;
        this.errorWhileRecoveringData = true;
      }
    });
  }
}
