import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import { WindowRef } from './shared/utility/windowref';

import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroSearchComponent } from './hero-search.component';

//services
import { HeroService } from './hero.service';
import { HeroSearchService } from './hero-search.service';
import { CurrentAccountService } from './current-account.service';

import { LoginComponent } from "./login.component";
import { LoginMenuComponent } from "./login-menu.component";
import { SDKBrowserModule } from './shared/angular-client/index';
import {SignupComponent} from "./signup.component";
import {ResetPasswordRequestComponent} from "./reset-password-request.component";
import {ResetPasswordComponent} from "./reset-password.component";
import {StateReciprocityComponent} from "./state-reciprocity.component";


@NgModule({
  imports:      [ BrowserModule,
                  AppRoutingModule,
                  HttpModule,
                 // InMemoryWebApiModule.forRoot(InMemoryDataService),
                  FormsModule,
                  SDKBrowserModule.forRoot()
                ],
  providers:    [ WindowRef, CurrentAccountService, HeroService, HeroSearchService ],
  declarations: [ AppComponent,
                  DashboardComponent,
                  HeroesComponent,
                  HeroDetailComponent,
                  HeroSearchComponent,
                  LoginComponent,
                  LoginMenuComponent,
                  SignupComponent,
                  ResetPasswordRequestComponent,
                  ResetPasswordComponent,
                  StateReciprocityComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }


