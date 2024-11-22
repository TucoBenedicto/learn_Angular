import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../../models/face-snap';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  LowerCasePipe,
  NgClass,
  NgStyle,
  PercentPipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { FaceSnapsService } from '../../services/face-snaps.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    /* Difference entre Style est Class:
    Utilisez style pour des ajustements rapides ou uniques sur un élément.
    Utilisez class pour des styles réutilisables et un code plus propre et maintenable.
    */
    NgStyle, // on import NgStyle , qui Ajoute un style CSS dynamique
    NgClass, // on import NgClass , qui Ajoute une class CSS dynamique

    /*
    Un pipe permet de formater l'affichage d'une donnée sans modifier la donnée sous-jacente.
    */
    UpperCasePipe, // pipe permettant au texte d'etre en majuscule
    LowerCasePipe, // pipe permettant au texte d'etre en minuscule
    TitleCasePipe, // pipe permettant à la 1ere letttre d'etre en majuscule
    DatePipe, // pipe permettant de formater la date
    DecimalPipe, //pipe permettant de formater les nombres
    PercentPipe, //pipe permettant de formater les pourcentage
    CurrencyPipe, //pipe permettant de formater l'argent


    RouterLink, //va nous permettre de creer des liens/routes vers les autres pages

  ],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss',
})
export class SingleFaceSnapComponent implements OnInit {
  //Pour qu'une propriété puisse être injectée depuis l'extérieur d'un component, il faut lui ajouter le décorateur  @Input(). Créez maintenant une propriété  faceSnap  de type  FaceSnap  (votre nouveau type !)
  //cette fois notre component parent sera lié au model est ses differents attribut
  //@Input permet de passer des données d'un composant parent à un composant enfant de manière réactive.
  faceSnap!: FaceSnap;

  snapButtonText!: string;
  userHasSnapped!: boolean;
  myLargeNumber: number = 515845655.17;
  myPercentage: number = 0.3545;
  myPrice: number = 45;

  //on inject ActivatedRoute pour recuperer les informations de la route activée (:id)
  constructor(
    private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ) {}

  // La méthode ngOnInit() est utilisée pour Initialiser les données
  ngOnInit(): void {
    this.prepareInterface();
    this.getFaceSnap();
  }

  // Event : Le nom de méthode commence toujours par "on" signale que cette méthode répond à un événement (clique d'un bouton).
  // la methode onSnap va changer le style CSS de faceSnape , ainsi que incrementer le nombre de snap , ainsi que changer le text du bouton,
  onSnap(): void {
    if (this.userHasSnapped) {
      this.unSnap();
    } else {
      this.snap();
    }
  }

  unSnap() {
    //this.faceSnap.removeSnap();
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
    this.snapButtonText = 'Oh Snap!';
    this.userHasSnapped = false;
  }

  snap() {
    //this.faceSnap.addSnap(); avant on snapper (incremation +1) grace a cette ligne
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap'); // maintenant on snap (incremenation +1) à l'aide de l'ID de chaque face Snap
    this.snapButtonText = 'Oops, unSnap!';
    this.userHasSnapped = true;
  }

  //on recupere le faceSnap
  private getFaceSnap() {
    //On récupére le paramètre id via le snapshot de la route ,present dans l'url (un snapshot est un aperçu instantané d'une valeur qui change au cours du temps)
    const faceSnapId = this.route.snapshot.params['id'];
    // récupérer le FaceSnap correspondant à l'id  récupéré
    this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  //methode qui va mettre les valeur suivante par defaut au bouton 
  private prepareInterface() {
    this.snapButtonText = 'Oh Snap!';
    this.userHasSnapped = false;
  }

}
