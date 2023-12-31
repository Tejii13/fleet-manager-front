import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FetchUserDataService } from './fetch-user-data.service';
import { StarCitizenApiService } from './star-citizen-api.service';
import { FetchFleetDataService } from './fetch-fleet-data.service';
import { UpdateAccountService } from './update-account.service';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MonEspaceComponent } from './User-Interface/Member-Interface/mon-espace/mon-espace.component';
import { SearchShipsComponent } from './User-Interface/Member-Interface/search-ships/search-ships.component';
import { DisplayShipsComponent } from './User-Interface/Member-Interface/display-ships/display-ships.component';
import { AddUserComponent } from './User-Interface/Admin-Interface/add-user/add-user.component';
import { ChangePasswordComponent } from './User-Interface/Member-Interface/change-password/change-password.component';
import { DisplayMembersComponent } from './User-Interface/Admin-Interface/display-members/display-members.component';
import { AdminPanelComponent } from './User-Interface/Admin-Interface/admin-panel/admin-panel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShipSynthesisComponent } from './User-Interface/Member-Interface/ship-synthesis/ship-synthesis.component';
import { MyFleetComponent } from './User-Interface/Member-Interface/my-fleet/my-fleet.component';
import { OverviewComponent } from './User-Interface/Admin-Interface/overview/overview.component';
import { MemberHangarDisplayComponent } from './User-Interface/Admin-Interface/member-hangar-display/member-hangar-display.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { ShipAddPopupComponent } from './User-Interface/Member-Interface/ship-add-popup/ship-add-popup.component';
import { DisplayShipsFilterBarComponent } from './User-Interface/Member-Interface/display-ships-filter-bar/display-ships-filter-bar.component';
import { LegalComponent } from './legal/legal.component';
import { SubNavbarComponent } from './User-Interface/Member-Interface/sub-navbar/sub-navbar.component';
import { OrganizationComponent } from './User-Interface/Member-Interface/organization/organization.component';
import { SubNavbarBurgerComponent } from './User-Interface/Member-Interface/sub-navbar-burger/sub-navbar-burger.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NotFoundComponent,
    MonEspaceComponent,
    SearchShipsComponent,
    DisplayShipsComponent,
    AddUserComponent,
    ChangePasswordComponent,
    DisplayMembersComponent,
    AdminPanelComponent,
    NavbarComponent,
    ShipSynthesisComponent,
    MyFleetComponent,
    OverviewComponent,
    MemberHangarDisplayComponent,
    FooterComponent,
    ConfirmDeleteComponent,
    ShipAddPopupComponent,
    DisplayShipsFilterBarComponent,
    LegalComponent,
    SubNavbarComponent,
    OrganizationComponent,
    SubNavbarBurgerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  providers: [
    CookieService,
    StarCitizenApiService,
    FetchUserDataService,
    UpdateAccountService,
    FetchFleetDataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
