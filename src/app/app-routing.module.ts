import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CountriesComponent } from './component/countries/countries.component';
import { VaccinationComponent } from './component/vaccination/vaccination.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'countries',component: CountriesComponent},
  {path: 'vaccination',component: VaccinationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
