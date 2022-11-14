import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {CityListComponent} from "./components/city/city-list/city-list.component";
import {CityDetailComponent} from "./components/city/city-detail/city-detail.component";
import {UserListComponent} from "./components/user/user-list/user-list.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'cities', component: CityListComponent},
  {path: 'cities/:id', component: CityDetailComponent},
  {path: 'cities/new', component: CityDetailComponent},
  {path: 'users', component: UserListComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
