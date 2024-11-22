import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


//Rappel : Le décorateur @Injectable() permet à Angular de savoir qu'une classe peut être utilisée comme une dépendance dans d'autres classes via l'injection de dépendances.
//Les intercepteurs sont enregistrés différemment des services, donc n'ajoutez surtout pas  { providedIn: 'root' }  au décorateur !
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  //on injecte la dependance authService
  constructor(private authService: AuthService) {}


  //La méthode  intercept()  sera appelée pour chaque requête et recevra cette requête comme argument
  //Un intercepteur HTTP intercepte toutes les requêtes HTTP envoyées par votre application pour effectuer des tâches requises, comme l'ajout d'un header d'autorisation.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //vous créez des  headers  utilisables par Angular avec  new HttpHeaders() et vous utilisez leur méthode  append()  pour y ajouter un header  Authorization  qui contient  Bearer TOKEN   – c'est souvent la forme requise pour ce type de header ;
    const headers = new HttpHeaders().append('Authorization', `Bearer ${this.authService.getToken()}`);
    //vous créez une nouvelle requête en clonant la précédente et en y ajoutant les  headers  que vous venez de créer – les requêtes sont des objets immuables (qu'on ne peut pas modifier), donc on créera toujours une nouvelle requête qui contient les modifications requises ;
    const modifiedReq = req.clone({ headers });
    //vous retournez  next.handle()  en y passant la nouvelle requête – c'est ce qui permet à la requête de continuer son chemin.
    return next.handle(modifiedReq);
  }
}
