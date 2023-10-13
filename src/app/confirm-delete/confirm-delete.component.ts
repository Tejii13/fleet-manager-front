import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent implements OnInit {
  @Input() username!: string;
  @Output() removingValidated: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public message: string = '';

  ngOnInit(): void {
    if (this.username) {
      this.message = `Souhaitez vous vraiment supprimer l'utilisateur ${this.username}?`;
    }
  }

  // confirmRemove() {
  //   this.removingValidated.emit(true);
  // }
  // cancelRemove() {
  //   this.removingValidated.emit(false);
  // }

  handleClick(value: boolean) {
    this.removingValidated.emit(value);
  }
}
