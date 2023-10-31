import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Ship } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class InAppService {
  constructor(private route: ActivatedRoute, private router: Router) {}

  // Function to navigate to 'ships' view
  navigateToShips(id: string) {
    this.router.navigate(['/mon-espace', id], {
      queryParams: { view: 'ships' },
    });
  }

  // Function to navigate to 'synthesis' view
  navigateToSynthesis(id: string) {
    this.router.navigate(['/mon-espace', id], {
      queryParams: { view: 'synthesis' },
    });
  }

  // Function to navigate to 'overview' view
  navigateToOverview(id: string) {
    this.router.navigate(['/mon-espace', id], {
      queryParams: { view: 'overview' },
    });
  }

  navigateToMembers(id: string) {
    this.router.navigate(['/mon-espace', id], {
      queryParams: { view: 'members' },
    });
  }

  sortShipsByOrder(orderValue: string, ships: Ship[]) {
    let sortedShipsByOrder: Ship[] = [];

    const order = orderValue;
    console.log(order);

    switch (order) {
      case 'scuAsc':
        sortedShipsByOrder = ships
          .slice()
          .sort((a, b) => a.cargo_capacity - b.cargo_capacity);
        break;
      case 'scuDsc':
        sortedShipsByOrder = ships
          .slice()
          .sort((a, b) => b.cargo_capacity - a.cargo_capacity);
        break;
      case 'crewAsc':
        sortedShipsByOrder = ships
          .slice()
          .sort((a, b) => a.max_crew - b.max_crew);
        break;
      case 'crewDsc':
        sortedShipsByOrder = ships
          .slice()
          .sort((a, b) => b.max_crew - a.max_crew);
        break;
      default:
        sortedShipsByOrder = ships.slice(); // Default case to show all ships
    }

    console.log(sortedShipsByOrder);
    return sortedShipsByOrder;
  }
}
