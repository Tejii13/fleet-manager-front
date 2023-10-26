import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

import { UpdateAccountService } from 'src/app/update-account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  public newPasswordForm!: FormGroup;

  constructor(
    private updateAccount: UpdateAccountService,
    private formBuilder: FormBuilder
  ) {
    this.newPasswordForm = this.formBuilder.group({
      newPassword: '',
      confirmPassword: '',
    });
  }

  @Input() userId!: number;

  @Output() passwordVerifiedEvent = new EventEmitter<boolean>();

  public message!: string;

  public changingPassword: boolean = false;

  handlePasswordChange() {
    const newPassword: string = this.newPasswordForm.get('newPassword')?.value;
    const confirmPassword: string =
      this.newPasswordForm.get('confirmPassword')?.value;
    if (
      newPassword &&
      newPassword.length >= 8 &&
      confirmPassword &&
      newPassword !== '' &&
      newPassword === confirmPassword
    ) {
      this.changingPassword = true;
      this.message = '';
      this.updateAccount
        .updatePassword(this.userId, confirmPassword)
        .subscribe((data) => {
          this.changingPassword = false;
          this.passwordVerifiedEvent.emit(true);
        });
    } else {
      if (newPassword && newPassword.length < 8) {
        this.message = 'Le mot de passe doit comporter au minimum 8 caractères';
      } else {
        this.message = 'Vérifiez le mot de passe saisi et réessayez.';
      }
    }
  }
}
