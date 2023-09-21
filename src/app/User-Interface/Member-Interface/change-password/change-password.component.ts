import { Component, Input } from '@angular/core';

import { UpdateAccountService } from 'src/app/update-account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  constructor(private updateAccount: UpdateAccountService) {}

  @Input() userId!: number;

  public message!: string;

  public newPassword!: string;
  public confirmPassword!: string;

  handlePasswordChange() {
    if (
      this.newPassword &&
      this.confirmPassword &&
      this.newPassword !== '' &&
      this.newPassword === this.confirmPassword
    ) {
      // this.updateAccount
      //   .updatePassword(this.userId, this.confirmPassword)
      //   .subscribe((data) => {
      //     console.log(data);
      //   });
      this.updateAccount.getRandomId(this.userId);
    } else {
      this.message = 'Vérifiez le mot de passe et réessayez.';
    }
  }
}
