import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SessionService } from './services/session/session.service';
import { LocalStorageService } from 'ngx-webstorage';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CityDetailComponent } from './components/city/city-detail/city-detail.component';
import { CityListComponent } from './components/city/city-list/city-list.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TitleComponent} from "./components/title/title.component";
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        CityDetailComponent,
        CityListComponent,
        SideBarComponent,
        TitleComponent,
        UserListComponent,
        UserDetailComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    FormBuilder,
    SessionService,
    LocalStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
