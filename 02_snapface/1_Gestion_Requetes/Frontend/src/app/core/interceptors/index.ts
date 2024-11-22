import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';


/*
Puisqu'une application comporte généralement plusieurs intercepteurs, pour éviter de trop polluer AppModule on commence généralement par créer un fichier d'index qui prépare l'enregistrement de tous les intercepteurs au même endroit.
 */
export const httpInterceptorProviders = [
  /*
  L'utilisation de  HTTP_INTERCEPTORS  dit à Angular qu'il s'agit ici d'un intercepteur HTTP.
  Vous y attribuez la classe AuthInterceptor que vous venez de créer.
  La clé multi  prévient que vous allez certainement ajouter plusieurs intercepteurs à la clé HTTP_INTERCEPTORS  .
   */
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
