import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductResultsComponent } from './product-results/product-results.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',                 component: HomeComponent },
  { path: 'login',                component: LoginComponent },
  { path: 'forgot',               component: ForgotComponent },
  { path: 'privacy',              component: PrivacyComponent },
  { path: 'aboutus',              component: AboutusComponent },
  { path: 'register',             component: SignupComponent },
  { path: 'contactus',            component: ContactusComponent },
  { path: 'questions/:id',        component: QuestionsComponent },
  { path: 'product-results/:id',  component: ProductResultsComponent },
  { path: 'product-details/:id',  component: ProductDetailsComponent },

  { path: 'user-profile',         component: ProfileComponent },
  { path: 'landing',              component: LandingComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
