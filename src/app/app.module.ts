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

import { FetchDataService } from './fetch-data.service';
import { StarCitizenApiService } from './star-citizen-api.service';
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
  ],
  providers: [
    CookieService,
    StarCitizenApiService,
    FetchDataService,
    UpdateAccountService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
