import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import * as fr from '@angular/common/locales/fr';

import {AppComponent} from './app.component';
import {FaceSnapComponent} from './features/face-snaps/components/face-snap/face-snap.component';
import {FaceSnapListComponent} from './features/face-snaps/components/face-snap-list/face-snap-list.component';
import {HeaderComponent} from './core/components/header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {LandingPageComponent} from './features/landing-page/components/landing-page/landing-page.component';
import {SingleFaceSnapComponent} from './features/face-snaps/components/single-face-snap/single-face-snap.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewFaceSnapComponent} from './features/face-snaps/components/new-face-snap/new-face-snap.component';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from "./core/interceptors";
import {CoreModule} from "./core/core.module";
import {FaceSnapsModule} from "./features/face-snaps/face-snaps.module";
import {LandingPageModule} from "./features/landing-page/landing-page.module";
import {AuthModule} from "./auth/auth-module";


@NgModule({
  declarations: [
    AppComponent,
    //HeaderComponent,depplacer dans le core module
    //FaceSnapComponent,depplacer dans le face-snaps module
    //FaceSnapListComponent,depplacer dans le face-snaps module
    //SingleFaceSnapComponent,depplacer dans le face-snaps module
    //NewFaceSnapComponent,depplacer dans le face-snaps module
    //LandingPageComponent,depplacer dans le langing-page module
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //FormsModule,//pour la gestion des formulaires template
    //ReactiveFormsModule, // pour la gestion des formulaire reactive
    //HttpClientModule,// pour la gestion des requete HTTP
    CoreModule,
    //FaceSnapsModule,
    LandingPageModule,
    AuthModule
  ],
  providers: [
    //tous ce ceci a été deplacer dans dans le core modile pour respecter les bonnes pratiques
   // {provide: LOCALE_ID, useValue: 'fr-FR'},
   // httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  //Deplacer dans le core module
/*  constructor() {
    registerLocaleData(fr.default);
  }*/
}
