import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SingleFaceSnapComponent} from "./components/single-face-snap/single-face-snap.component";
import {FaceSnapListComponent} from "./components/face-snap-list/face-snap-list.component";
import {NewFaceSnapComponent} from "./components/new-face-snap/new-face-snap.component";
import {AuthGuard} from "../../core/guards/auth.guard";

/*
En Angular, le lazy loading (chargement différé) est une technique qui consiste à charger des modules ou
des fonctionnalités uniquement lorsque cela est nécessaire, plutôt que de les charger au
démarrage de l'application. Cela permet de réduire le temps de chargement initial de
l'application et d'améliorer les performances.
*/
/*
Pour qu'un module puisse être lazy loaded, il doit s'occuper de son propre routing
 */
/*
l'importance de l'ordre des routes lors de leur enregistrement. Angular traverse le tableau de Routes dans l'ordre, et applique la première qui ressemble à la route demandée.
 soit "facesnaps/create/id"
 si on met dans la contance route create ,apres id , on n'obtiens l'ur suivante "facesnaps/id/create" ce qui mene a un bug
 */
/*
Rappel "canActivate" permet de proteger la page si on n'est pas authentifé
 */
const routes: Routes = [
  { path: 'create', component: NewFaceSnapComponent, canActivate: [AuthGuard] },
  { path: ':id', component: SingleFaceSnapComponent, canActivate: [AuthGuard] },
  { path: '', component: FaceSnapListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  /*
  Au lieu d'utiliser RouterModule.forRoot() (qui ne doit être appelée qu'une seule fois par votre routeur racine), vous utilisez RouterModule.forChild() pour enregistrer ces routes au routeur déjà créé.
   */
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaceSnapsRoutingModule {}
