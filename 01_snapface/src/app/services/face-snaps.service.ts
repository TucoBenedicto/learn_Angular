/*
Role du service
Dans une application complète Angular, vous aurez des dizaines, voire des centaines de components différents. Ces components auront très souvent besoin d'accéder aux mêmes données. Il y aura des interactions courantes avec ces données, comme l'écriture, la modification et la suppression. L'application peut également avoir besoin d'interagir avec un serveur concernant ces données, pour la lecture et l'enregistrement. 
Pour mieux organiser votre code, pour éviter de répéter des blocs et pour toujours avoir des données à jour partout dans l'application, ce serait intéressant de pouvoir regrouper les données et leurs méthodes ensemble, de les centraliser. En Angular, cette centralisation se fait dans des services.
Les services permettent de centraliser les données et la logique pour les différents domaines de votre application.
*/

import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { SnapType } from '../models/snap-type.type';

/*
Un service est une classe, et la façon la plus simple de déclarer une classe comme étant un service est d'utiliser le décorateur  @Injectable()
*/
/*
L'objet de configuration qui spécifie  providedIn: 'root'  dit à Angular d'enregistrer ce service à la racine de l'application. Ce sera très souvent le cas pour vos services, car ça permet de s'assurer de n'avoir qu'une seule instance du service, partagée par tous les partis intéressés.
*/
@Injectable({
  providedIn: 'root',
})
export class FaceSnapsService {
  faceSnaps: FaceSnap[] = [
    new FaceSnap(
      'Archibald',
      'Mon meilleur ami depuis toujours !',
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      new Date(),
      0
    ),
    new FaceSnap(
      'Mohamed',
      'le meilleur homme de tous les temps !',
      'https://cdn.pixabay.com/photo/2024/10/24/15/55/giraffe-9146077_960_720.jpg',
      new Date(),
      10
    ).withLocation('à la montagne'), //ici on va chéner la methode "withLocation" pour pouvoir definir un autre attribut supplementaire , Cette approche permet de configurer un objet lors de son instantiation, et d'une manière très lisible ! Notre tableau contient donc un FaceSnap avec sa localisation.
    new FaceSnap(
      'Rachid',
      'le pire des enemies!',
      'https://cdn.pixabay.com/photo/2024/02/12/16/05/siguniang-mountain-8568913_960_720.jpg',
      new Date(),
      200
    ),
  ];

  //on utilise un getter pour nous retourner le tableau faceSnaps
  getFaceSnaps(): FaceSnap[] {
    // shallow copy ,ici le but est de faire une copy du tableau "faceSnaps"
    /*
        l’utilisation d’une "shallow copy" dans la méthode getFaceSnaps() joue un rôle important pour protéger la liste faceSnaps de modifications non intentionnelles par d’autres parties du code.
        */
    return [...this.faceSnaps];
  }

  /*
    cette methode permet de recuperer le FaceSnap via cet identifiant unique ( Grace au RandomUUID) va permettre de snapé (ngClass -> css) un FaceSnap par son identifiant "faceSnap.id"
    Mais aussi , recuperer ce meme id , qui va nous service a afficher le faceSnape via son url "ActivatedRoute"
    */
  getFaceSnapById(faceSnapId: string): FaceSnap {
    const foundFaceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    if (!foundFaceSnap) {
      throw new Error('FaceSnap not found!');
    }//on ne met pas de "else" car si on "trow" une erreur ca va arreter la fonction ce que l'on ne souhaite pas
    return foundFaceSnap;
  }



  //cette methode va retourner le snapType ('snap'/'unsnap')
  snapFaceSnapById(faceSnapId: string, snapType: SnapType): void {
    const faceSnap = this.getFaceSnapById(faceSnapId);
    faceSnap.snap(snapType);
  }

}

/*
Comprendre la shallow Copy
const person = {
  name: "Alice",
  address: {
    city: "Paris",
    zip: "75000"
  }
};
//Création d'une shallow copy
const shallowCopy = {...person};
// Modification de la propriété de premier niveau "name"
shallowCopy.name = "Bob";
console.log(person.name);       // Affiche "Alice" (l'original n'est pas affecté)
console.log(shallowCopy.name);  // Affiche "Bob" (la copie est modifiée)
*/
