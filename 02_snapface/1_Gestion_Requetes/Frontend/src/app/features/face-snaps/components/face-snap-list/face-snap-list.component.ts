import { Component, OnInit, OnDestroy } from '@angular/core';
import { FaceSnap } from '../../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../../core/services/face-snaps.service';
import { interval, Observable, of, Subject} from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit , OnDestroy {

  faceSnaps!: FaceSnap[];
  //Subject est un Observable que vous pouvez faire émettre à la demande. Vous allez donc créer un Subject appelé  destroy$  qui émettra une seule fois, au moment de la destruction du component.
  private destroy$!: Subject<boolean>;//on met en private car destroy sera utilisé uniquement dans ce fichier

  //faceSnaps est un observale car il est utilisé pour la requete http vers le backend
  faceSnaps$ !: Observable<FaceSnap[]>;

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    //on initialise l'Observable , qui va recevoir les données du back
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
    this.destroy$ = new Subject<boolean>();//initialisation/instanciation de destroy
    //Observable et fuite de memoire
    //Il est impératife que unsubscribe (se désabonner) d'un observable quand on en à plus besoin pour eviter les fuites de memoires , car le processus continue
    //Attention : Les Observables souscrits avec le pipe  async  sont unsubscribe automatiquement par Angular lors de la destruction du component.
    //Méthode 1 : utilisation de "take" qui sa se désabonner des que l'observable aura renvoyé 3 valeurs
    //interval(1000).pipe(take(3),tap(console.log)).subscribe();
    //ou
    //interval(1000).pipe(tap(value => console.log(value))).subscribe();
    //Méthode 2 :
    interval(1000).pipe(
      tap(console.log),
      takeUntil(this.destroy$)//Cet opérateur dit à l'Observable  interval  de continuer à émettre tant que  destroy$  n'a pas émis, mais dès que  destroy$  émet, de compléter l'Observable.
    ).subscribe()

  };

  //ngOnDestroy  est appelé au moment de la destruction du component.
  ngOnDestroy(): void {
    this.destroy$.next(true);//Pour faire émettre un Subject, on appelle sa méthode  next()
  }

}
