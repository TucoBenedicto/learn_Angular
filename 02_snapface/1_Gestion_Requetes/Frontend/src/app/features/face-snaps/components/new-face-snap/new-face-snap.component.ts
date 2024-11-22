import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FaceSnap } from '../../../../core/models/face-snap.model';
import {map, tap} from 'rxjs/operators';
import { FaceSnapsService } from '../../../../core/services/face-snaps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss'],
})
export class NewFaceSnapComponent implements OnInit {
  //Creation du reactive forms
  //déclare la variable qui contiendra l'objet du formulaire
  snapForm!: FormGroup;

  //Pour avoir un premier aperçu du côté "réactif" des formulaires réactifs, je vous propose d'afficher en temps réel le FaceSnap que l'utilisateur est en train de créer.
  //vous allez créer un Observable  faceSnapPreview$  qui émettra des objets de type  FaceSnap
  faceSnapPreview$!: Observable<FaceSnap>;

  faceSnaps$ !: Observable<FaceSnap[]>;

  //Validation du formulaire à l'aide des regex
  urlRegex!: RegExp;

  //injection de dependance : injecter un outil qui simplifie largement la génération des formulaires réactifs, le FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private faceSnapsService: FaceSnapsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //pour vérifier que le texte entré par l'utilisateur correspond à une UR
    this.urlRegex =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    // vous allez utiliser le  FormBuilder  pour construire votre formulaire :
    this.snapForm = this.formBuilder.group(
      {
        //les clés de l'objet correspondent aux noms des champs
        //les valeurs de l'objet correspondent à la configuration de chaque champ
        title: [null, [Validators.required]], //La première validation que vous allez ajouter est celle qui vérifie que les champs requis contiennent bien des valeurs.
        description: [null, [Validators.required]],
        imageUrl: [
          null,
          [Validators.required, Validators.pattern(this.urlRegex)],
        ], //on ajoute un 2eme validatore
        location: [null],
      },
      {
        updateOn: 'blur', //Maintenant, les informations entrées dans le formulaire ne sont affichées dans l'aperçu que lorsque l'utilisateur change le focus du formulaire
      }
    );

    //Afficher en temps réel la création du face snape
    //Branchez cet Observable aux changements de valeur du formulaire avec son attribut  valueChanges  , un Observable qui émet la valeur du formulaire à chaque modification :
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      //Le seul souci ici est que le formulaire n'émet pas des objets de type FaceSnap : il manque des attributs. Il faut donc utiliser l'un des opérateurs que vous avez découverts pour transformer les émissions en FaceSnaps valables – l'opérateur map()
      map((formValue) => ({
        ...formValue, //on recupere l'ensemble des données du formulaire
        //et on ajoute les elements manquants pour avoir un vrai FaceSnaps
        createdDate: new Date(),
        snaps: 0,
        id: 0,
      }))
    );


    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
  }


  onSubmitForm() {
    //Comme avec les formulaires template, vous accédez au contenu du formulaire avec l'attribut  value
    console.log(this.snapForm.value);
     //on ajoute un nouveau faceSnap
    /*
      Attention à l'asynchrone ! Si une action doit être effectuée après une requête, utilisez des opérateurs comme  tap()
      dans le  pipe  de la requête ;
      Quand une méthode de service génère une requête, le best practice est de retourner
      l'Observable et d'y souscrire depuis le component.
    */
      this.faceSnapsService.addFaceSnap(this.snapForm.value).pipe(
        tap(() => this.router.navigateByUrl('/facesnaps'))//et on redirige vers facesnaps
      ).subscribe();


  }

}
