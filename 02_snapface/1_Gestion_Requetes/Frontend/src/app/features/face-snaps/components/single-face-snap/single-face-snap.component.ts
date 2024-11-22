import {Component, OnInit} from '@angular/core';
import {FaceSnap} from '../../../../core/models/face-snap.model';
import {FaceSnapsService} from '../../../../core/services/face-snaps.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  //faceSnap!: FaceSnap;
  //faceSnaps est un observale car il est utilisé pour la requete http vers le backend
  faceSnap$!: Observable<FaceSnap>;
  buttonText!: string;


  constructor(private faceSnapsService: FaceSnapsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.buttonText = 'Oh Snap!';
    const faceSnapId = +this.route.snapshot.params['id'];
    //on initialise l'Observable , qui va recevoir les données du back
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  //OnSnap Non refactoriser
  /*  onSnap(faceSnapId: number) {
      if (this.buttonText === 'Oh Snap!') {
        this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        // à l'interieur du pipe tous sera traité uniquement si les donnée de this.faceSnap$ soit bien completé/chargé/terminé
         // Ici, vous profitez du fait que l'Observable du PUT émette au moment de la réponse positive du serveur, pour ajouter un  tap()  qui vient renouveler la requête GET du FaceSnap simple et mettre à jour le texte du bouton !
          tap(() => {
            this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
            this.buttonText = 'Oops, unSnap!';
          })
        ).subscribe();
      } else {
        this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
          tap(() => {
            this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
            this.buttonText = 'Oh Snap!';
          })
        ).subscribe();
      }
    }*/

  //OnSnap refactoriser
  // Avec cette implémentation, il n'y a même pas besoin d'appeler  .subscribe()  car le pipe  async  du template souscrit pour nous !
  onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(() => this.buttonText = 'Oops, unSnap!')
      );
    } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(() => this.buttonText = 'Oh Snap!')
      );
    }
  }


}
