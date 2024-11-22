import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FaceSnapComponent} from "./components/face-snap/face-snap.component";
import {FaceSnapListComponent} from "./components/face-snap-list/face-snap-list.component";
import {SingleFaceSnapComponent} from "./components/single-face-snap/single-face-snap.component";
import {NewFaceSnapComponent} from "./components/new-face-snap/new-face-snap.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FaceSnapsRoutingModule} from "./face-snaps-routing.module";



@NgModule({
  declarations: [
    FaceSnapComponent,
    FaceSnapListComponent,
    SingleFaceSnapComponent,
    NewFaceSnapComponent,
  ],
  imports: [
    CommonModule,
    //RouterModule, // le routing est desormais gerer en layzyloading grace a "face-snaps-routing-module.ts"
    ReactiveFormsModule, // pour la gestion des formulaire reactive
    FaceSnapsRoutingModule, // utilisation du lazy loading pour les routes liées aux face-snaps
    //FormsModule,//pour la gestion des formulaires template
    //HttpClientModule,// pour la gestion des requete HTTP
  ],
  exports: [
    FaceSnapComponent,
    FaceSnapListComponent,
    SingleFaceSnapComponent,
    NewFaceSnapComponent,
  ]
})
export class FaceSnapsModule { }
