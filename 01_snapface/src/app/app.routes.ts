import { Routes } from '@angular/router';
import { FaceSnapListComponent } from './features/face-snap-list/face-snap-list.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { SingleFaceSnapComponent } from './features/single-face-snap/single-face-snap.component';

export const routes: Routes = [
    //Page d'accueil
    {path: '', component:LandingPageComponent},
    //Creation de la route , avec l'url 'facesnaps' et son component 'FaceSnapListComponent'
    {path : 'facesnaps', component: FaceSnapListComponent },
    //Route Active :
    //une route avec un paramètre id  pour visualiser un seul FaceSnap
    //Il faut que l'on puisse y passer un paramètre dynamique, c'est-à-dire le segment de la route qui contiendra l'id  du FaceSnap, et qui sera donc dynamique
    {path: 'facesnaps/:id', component:SingleFaceSnapComponent}
];
