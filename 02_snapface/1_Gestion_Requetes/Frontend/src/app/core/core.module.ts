import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {httpInterceptorProviders} from "./interceptors";
import * as fr from '@angular/common/locales/fr';
import {HeaderComponent} from "./components/header/header.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule// pour la gestion des requete HTTP
  ],
  exports: [
  HeaderComponent
],
  /*
 Un provider est un objet que l'on déclare à Angular pour qu'il puisse l'injecter à différentes endroits de l'application.
 D'ailleurs, même si vos services ne figurent pas ici, ce sont des providers également ! Ils sont déclarés avec  @Injectable()  et Angular peut ensuite les injecter là où vous en avez besoin, comme via le constructor de vos components, par exemple.
  */
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    httpInterceptorProviders //utilisation de l'interceptore pour nos requetes
  ],
})
export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
