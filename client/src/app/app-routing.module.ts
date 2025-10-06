import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


import { AppComponent } from './app.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';


import { CreatehospitalComponent } from './createhospital/createhospital.component';
import { ScheduleMaintenanceComponent } from './schedule-maintenance/schedule-maintenance.component';
import { RequestequipmentComponent } from './requestequipment/requestequipment.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { OrdersComponent } from './orders/orders.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'MediSphere-Login' } },
  { path: 'registration', component: RegistrationComponent , data: { title: 'MediSphere-Register' } },
  { path: 'dashboard', component: DashbaordComponent , data: { title: 'MediSphere-Dashboard' } },
  { path: 'createhospital', component: CreatehospitalComponent , data: { title: 'MediSphere-Create Hospital' } },  
  { path: 'schedule-maintenance', component: ScheduleMaintenanceComponent , data: { title: 'MediSphere-Schedule-Maintenance' } },  
  { path: 'requestequipment', component: RequestequipmentComponent , data: { title: 'MediSphere-Request-Equipment' } },  
  { path: 'maintenance', component: MaintenanceComponent , data: { title: 'MediSphere-Maintenance' } },  
  { path: 'orders', component: OrdersComponent , data: { title: 'MediSphere-Orders' }},  
  { path: 'homepage', component: HomepageComponent ,data: { title: 'MediSphere-HomePage' }},
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'privacy', component: PrivacyComponent },  
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },

  // { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}