import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from './component/add-person/add-person.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EditPersonComponent } from './component/edit-person/edit-person.component';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { PersonDetailComponent } from './component/person-detail/person-detail.component';
import { PersonsComponent } from './component/persons/persons.component';
import { RegisterComponent } from './component/register/register.component';
import { SettingsComponent } from './component/settings/settings.component';

const routes: Routes = [
  { path: '',
    component: DashboardComponent 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'persons',
    component: PersonsComponent,
  },
  {
    path: 'person/add',
    component: AddPersonComponent
  },
  {
    path: 'person/edit/:id',
    component: EditPersonComponent
  },
  {
    path: 'person/:id',
    component: PersonDetailComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '*',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
