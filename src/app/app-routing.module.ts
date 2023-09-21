import { MonEspaceComponent } from './User-Interface/Member-Interface/mon-espace/mon-espace.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'accueil', component: LandingPageComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'mon-espace', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'mon-espace/:id', component: MonEspaceComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
