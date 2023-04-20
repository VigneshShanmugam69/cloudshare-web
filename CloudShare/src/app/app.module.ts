import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ConfigurationComponent } from './admindashboard/configuration/configuration.component';
import { UseraccessmanagementComponent } from './admindashboard/useraccessmanagement/useraccessmanagement.component';
import { SpacemanagementComponent } from './admindashboard/spacemanagement/spacemanagement.component';
import { CostmanagementComponent } from './admindashboard/costmanagement/costmanagement.component';
import { TopbarComponent } from './admindashboard/topbar/topbar.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';


const oktaConfig = {
  issuer: 'https://dev-99932483.okta.com/oauth2/default',
  clientId: '0oa8gaw5glpoV7Lu85d7',
  redirectUri: window.location.origin + '/callback'
};
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AdmindashboardComponent,
    ConfigurationComponent,
    UseraccessmanagementComponent,
    SpacemanagementComponent,
    CostmanagementComponent,
    TopbarComponent,
    ChangepasswordComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// { provide: HTTP_INTERCEPTORS, useClass: DashboardComponent, multi: true }
// { provide: OKTA_CONFIG, useValue: oktaConfig }