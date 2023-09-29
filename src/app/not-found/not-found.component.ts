import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  public fruits: string[] = [
    'Pineapple',
    'Grape',
    'Cranberry',
    'Cherry',
    'Orange',
    'Watermelon',
    'Banana',
    'Apple',
    'Coconut',
  ];
}
