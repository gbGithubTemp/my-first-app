import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { TabsModule} from 'ngx-bootstrap/tabs';
import { ButtonsModule} from 'ngx-bootstrap/buttons';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { ProprtyCardComponent } from './Property/Property-Card/property-card.component';
import { PropertyListComponent } from './Property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HousingService } from './Services/housing.service';
import { AddPropertyComponent } from './Property/add-Property/add-Property.component';
import { PropertyDetailComponent } from './Property/property-detail/property-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserServiceService } from './Services/user-service.service';
import { AlertifyService } from './Services/alertify.service';
import { AuthService } from './Services/auth.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PropertyDetailResolverService } from './Property/property-detail/property-detail-resolver.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';

const appRoutes: Routes = [
  {path: '', component: PropertyListComponent},
  {path: 'rent-property', component: PropertyListComponent},
  {path: 'add-property', component: AddPropertyComponent},
  {path: 'property-detail/:id', 
                    component: PropertyDetailComponent, 
                    resolve: {prp: PropertyDetailResolverService}},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: '**', component: PropertyListComponent}

]

@NgModule({
  declarations: [	
    AppComponent,
    ProprtyCardComponent,
    PropertyListComponent,
    NavBarComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FilterPipe,
    SortPipe
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgbModule,
    NgxGalleryModule
  ],
  providers: [
    HousingService,
    UserServiceService,
    AlertifyService,
    AuthService,
    PropertyDetailResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
