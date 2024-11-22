import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../../models/face-snap';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    /*
    Un pipe permet de formater l'affichage d'une donnée sans modifier la donnée sous-jacente.
    */
   UpperCasePipe,// pipe permettant au texte d'etre en majuscule
  ],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss',
})
export class FaceSnapComponent {
  //Pour qu'une propriété puisse être injectée depuis l'extérieur d'un component, il faut lui ajouter le décorateur  @Input(). Créez maintenant une propriété  faceSnap  de type  FaceSnap  (votre nouveau type !)
  //cette fois notre component parent sera lié au model est ses differents attribut
  //@Input permet de passer des données d'un composant parent à un composant enfant de manière réactive.
  //en l'occurence le composant parent est dans le template "face-snap-list.component.html" => <app-face-snap [faceSnap]="faceSnapElement"/>
  @Input() faceSnap!: FaceSnap;


  
  //on injecter Router pour pouvoir l'utiliser
  constructor(private router: Router){}


  onViewFaceSnap() {
    console.log("FaceSnap",this.faceSnap);
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }
}
