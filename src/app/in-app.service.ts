import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

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
}
