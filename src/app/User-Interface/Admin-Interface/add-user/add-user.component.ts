import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { FetchUserDataService } from '../../../fetch-user-data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  @Input() organizationId!: number;
  @Output() reloadDisplay: EventEmitter<void> = new EventEmitter<void>();
  @Output() showPasswordPopup: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() cancelAdd: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fetch: FetchUserDataService,
    private clipboard: Clipboard
  ) {}

  public username!: string;
  public role: Array<string> = ['hidden'];

  public mdpTemp!: string;
  public userCreated: boolean = false;

  public fieldsAreValid: boolean = true;
  public fetching: boolean = false;

  handleMemberAdd() {
    this.fetching = true;
    if (
      this.username &&
      this.role &&
      this.username !== '' &&
      (this.role.includes('membre') || this.role.includes('admin'))
    ) {
      this.fieldsAreValid = true;
      this.fetch
        .registerUser(this.username, this.role, this.organizationId)
        .subscribe((data) => {
          if (data.pass) {
            this.mdpTemp = data.pass;
            this.fetching = false;
          } else if (data.code === 201) {
            this.userCreated = true;
            this.fetching = false;
          }
        });
    } else {
      this.fetching = false;
      this.fieldsAreValid = false;
    }
  }

  reloadDisplayFunction() {
    this.reloadDisplay.emit();
  }

  cancel() {
    this.cancelAdd.emit();
  }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    this.reloadDisplay.emit();
    this.showPasswordPopup.emit(true);
  }
}
