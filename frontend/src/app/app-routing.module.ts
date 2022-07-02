import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PlacesComponent } from './pages/places/places.component';
import { PlaceComponent } from './pages/places/place/place.component';
import { NewPlaceComponent } from './pages/places/new-place/new-place.component';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  {path: '', component: PlacesComponent},
  {path: 'place/:id', component: PlaceComponent},
  {path: 'new-place', component: NewPlaceComponent, canActivate: [RoleGuardService], data: {roles: ['admin', 'user']}},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
