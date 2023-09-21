import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MonEspaceComponent } from './User-Interface/Member-Interface/mon-espace/mon-espace.component';
import { SearchShipsComponent } from './User-Interface/Member-Interface/search-ships/search-ships.component';
import { DisplayShipsComponent } from './User-Interface/Member-Interface/display-ships/display-ships.component';
import { AddUserComponent } from './User-Interface/Admin-Interface/add-user/add-user.component';
import { ChangePasswordComponent } from './User-Interface/Member-Interface/change-password/change-password.component';

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
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
