import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ConfigurationComponent } from './admindashboard/configuration/configuration.component';
import { CostmanagementComponent } from './admindashboard/costmanagement/costmanagement.component';
import { SpacemanagementComponent } from './admindashboard/spacemanagement/spacemanagement.component';
import { UseraccessmanagementComponent } from './admindashboard/useraccessmanagement/useraccessmanagement.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { ObjectpopupComponent } from './objectpopupCopyTo/objectpopup.component';
import { ListobjectcopyComponent } from './listobjectcopy/listobjectcopy.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'userdashboard',
    component: DashboardComponent
  },
  {
    path: 'admindashboard',
    component: AdmindashboardComponent
  },
  {
    path: 'useraccessmanagement',
    component: UseraccessmanagementComponent
  },
  {
    path: 'spacemanagement',
    component: SpacemanagementComponent
  },
  {
    path: 'costmanagement',
    component: CostmanagementComponent
  },
  {
    path: 'configuration',
    component: ConfigurationComponent
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent
  },
  {
    path: 'callback',
    component: OktaCallbackComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
