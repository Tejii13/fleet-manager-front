import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MonEspaceComponent } from './mon-espace/mon-espace.component';
import { SearchShipsComponent } from './search-ships/search-ships.component';
import { DisplayShipsComponent } from './display-ships/display-ships.component';

@NgModule({
  declarations: [AppComponent, LandingPageComponent, NotFoundComponent, MonEspaceComponent, SearchShipsComponent, DisplayShipsComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
