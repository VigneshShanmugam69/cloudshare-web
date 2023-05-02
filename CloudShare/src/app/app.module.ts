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
import { MatMenuModule } from '@angular/material/menu';
import { AgGridModule } from 'ag-grid-angular';
import {ObjectpopupComponent} from './objectpopupCopyTo/objectpopup.component';
import { OKTA_CONFIG,OktaAuthModule  } from '@okta/okta-angular';


const oktaConfig = {
  issuer: 'https://dev-99932483.okta.com/oauth2/default',
  clientId: '0oa96jm6l9Xbt6lmy5d7',
  // redirectUri: 'http://localhost:4200/login/callback',
  scopes: ['openid', 'profile'],
  pkce: true,
  redirectUri: window.location.origin + '/userdashboard'
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
    ChangepasswordComponent,
    ObjectpopupComponent,
    
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
    MatIconModule,
    MatMenuModule,
    AgGridModule,
    OktaAuthModule
    
  ],
  providers: [ { provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
// { provide: HTTP_INTERCEPTORS, useClass: DashboardComponent, multi: true }
// { provide: OKTA_CONFIG, useValue: oktaConfig }