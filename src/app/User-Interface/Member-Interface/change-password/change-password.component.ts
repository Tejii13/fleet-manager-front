import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UpdateAccountService } from 'src/app/update-account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  constructor(private updateAccount: UpdateAccountService) {}

  @Input() userId!: number;

  @Output() passwordVerifiedEvent = new EventEmitter<boolean>();

  public message!: string;

  public newPassword!: string;
  public confirmPassword!: string;

  public passwordVerified: boolean = false;

  handlePasswordChange() {
    if (
      this.newPassword &&
      this.confirmPassword &&
      this.newPassword !== '' &&
      this.newPassword === this.confirmPassword
    ) {
      this.updateAccount
        .updatePassword(this.userId, this.confirmPassword)
        .subscribe((data) => {
          this.passwordVerified = true;
          this.passwordVerifiedEvent.emit(true);
          console.log(data);
        });
    } else {
      this.message = 'Vérifiez le mot de passe et réessayez.';
    }
  }
}
