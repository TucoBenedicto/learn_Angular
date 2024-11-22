import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FaceSnapListComponent} from './features/face-snaps/components/face-snap-list/face-snap-list.component';
import {LandingPageComponent} from './features/landing-page/components/landing-page/landing-page.component';
import {SingleFaceSnapComponent} from './features/face-snaps/components/single-face-snap/single-face-snap.component';
import {NewFaceSnapComponent} from './features/face-snaps/components/new-face-snap/new-face-snap.component';

const routes: Routes = [
  //*Ancienne syntaxe pour le routing sans lazyloading
  /*  { path: 'facesnaps/:id', component: SingleFaceSnapComponent },
    { path: 'facesnaps', component: FaceSnapListComponent },
    { path: 'create', component: NewFaceSnapComponent },*/
  //*Nouvelle syntaxe avec le lazy loading
  //Il faut dire à AppRoutingModule de déléguer les routes  facesnaps/  à FaceSnapsModule.
  //Cette syntaxe fait en sorte qu'Angular génère un fichier JS séparé pour FaceSnapsModule, et l'application ne la charge que si l'utilisateur visite une route  facesnaps/ .
  //Le lazy loading génère un fichier JS séparé, pour un module qui n'est chargé que si l'utilisateur visite la route correspondante
  // ,Alors que sans "LazyLoading" c'est toute l'application qui est charger , ce qui engendre des soucie de performance
  {
    path: 'facesnaps',
    loadChildren: () => import('./features/face-snaps/face-snaps.module').then(m => m.FaceSnapsModule)
  },

  {path: '', component: LandingPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
