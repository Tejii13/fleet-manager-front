import { FetchDataService } from './../fetch-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionStatus, Member } from '../interfaces';

@Component({
  selector: 'app-mon-espace',
  templateUrl: './mon-espace.component.html',
  styleUrls: ['./mon-espace.component.scss'],
})
export class MonEspaceComponent implements OnInit {
  private id!: number;
  public username!: string;

  inputUsername!: string;
  inputRole!: Array<string>;

  constructor(private route: ActivatedRoute, private fetch: FetchDataService) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute !== null) {
      this.id = +idFromRoute;
      this.fetch.getUserinfo(this.id).subscribe((data: Member) => {
        this.username = data.username;
        console.log(data);
      });
    }
  }

  handleMemberAdd() {
    if (this.username && this.inputRole) {
      console.log(this.inputUsername);
      console.log(this.inputRole);
      this.fetch
        .registerUser(this.inputUsername, this.inputRole)
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      console.log('Veuillez remplir tous les champs');
    }
  }
}
