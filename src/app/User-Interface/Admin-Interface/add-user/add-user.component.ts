import { Component } from '@angular/core';
import { FetchDataService } from '../../../fetch-data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  public username!: string;
  public role!: Array<string>;

  public mdpTemp!: string;

  constructor(private fetch: FetchDataService) {}

  handleMemberAdd() {
    if (this.username && this.role) {
      console.log(this.username);
      console.log(this.role);
      this.fetch.registerUser(this.username, this.role).subscribe((data) => {
        console.log(data);
        this.mdpTemp = data.pass;
        console.log(this.mdpTemp);
      });
    } else {
      console.log('Veuillez remplir tous les champs');
    }
  }

  copyToClipboard(text: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
