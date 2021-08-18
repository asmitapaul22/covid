import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { CountriesComponent } from './component/countries/countries.component';
import {HttpClientModule} from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { DashboardCardComponent } from './component/dashboard-card/dashboard-card.component';
import { VaccinationComponent } from './component/vaccination/vaccination.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardCardComponent,
    VaccinationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
