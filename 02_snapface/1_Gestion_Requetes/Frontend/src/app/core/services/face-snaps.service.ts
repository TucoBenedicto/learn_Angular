import {Injectable} from '@angular/core';
import {FaceSnap} from '../models/face-snap.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class FaceSnapsService {
  /*
 les Observables existent pour faciliter la gestion de l'asynchrone. Les requêtes HTTP étant asynchrones, le HttpClient génère les requêtes sous forme d'Observables
*/
  constructor(private http: HttpClient) {
  }

  faceSnaps: FaceSnap[] = [];

  //retourn un Observable<FaceSnap[]>  , car on utiliser la méthode  get  de HttpClient
  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }


  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(
      `http://localhost:3000/facesnaps/${faceSnapId}`
    );
  }

  // le type de retour de cette méthode est  Observable<FaceSnap>  parce que la requête PUT finale renvoie le FaceSnap modifié comme confirmation
  // Le best practice est de retourner l'Observable généré par une requête, même pour des requêtes composées comme celle-là, et de laisser le component y souscrire. On respectera cette norme dans ce cours.
  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    // on utilise la méthode 'getFaceSnapById' qui permet de récupérer un FaceSnap par son ID, N'oubliez pas que cette méthode retourne l'Observable de la requête, donc vous pouvez très bien lui ajouter un  pipe()  pour y ajouter des opérateurs afin de créer l'Observable final dont vous avez besoin
    return this.getFaceSnapById(faceSnapId).pipe(
      //l'opérateur (bas niveau) map()  permet de prendre le FaceSnap retourné par le serveur, et de le transformer en un FaceSnap avec un snap de plus ou de moins, selon que le  snapType  est  'snap'  ou  'unsnap'
      map((faceSnap) => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1),
      })),
      //l'operateur (haut niveau) switchMap()  prend le FaceSnap modifié, et en génère une requête PUT .  put  prend l'URL comme premier argument et le corps de la requête à envoyer comme deuxième argument, et retourne l'Observable qui correspond à cette requête.
      // Prenons un instant pour se demander si  switchMap  est le bon choix. L'Observable extérieur ici est une requête GET. Il va donc émettre une fois et compléter (ou émettre une erreur si le serveur retourne une erreur). On n'aura donc jamais la situation où l'Observable extérieur émet de nouveau alors qu'une souscription à l'Observable intérieur est en cours.On peut donc, dans ce cas, utiliser l'opérateur haut niveau que l'on veut !
      switchMap((updatedFaceSnap) =>
        this.http.put<FaceSnap>(
          `http://localhost:3000/facesnaps/${faceSnapId}`,
          updatedFaceSnap
        )
      )
    );
    //Vous finissez donc avec un Observable qui enverra deux requêtes, avec la deuxième qui dépend du retour de la première.
  }

  /*
  Cette méthode :
  accepte un objet comme argument, qui correspond à l'objet généré par le formulaire ;
  crée un nouvel objet à partir de l'argument en ajoutant les champs manquants ;
  ajoute 1 à l' id  du dernier ajouté au tableau pour générer le nouveau, puisque les  id  des FaceSnap sont des entiers croissants ;
  ajoute le FaceSnap au tableau.
  */
  /*addFaceSnap(formValue: {
    title: string;
    description: string;
    imageUrl: string;
    location?: string;
  }) {
    const faceSnap: FaceSnap = {
      ...formValue,
      snaps: 0,
      createdDate: new Date(),
      id: this.faceSnaps[this.faceSnaps.length - 1].id + 1,
    };
    this.faceSnaps.push(faceSnap);
  }*/


  /*  postFaceSnap(faceSnap : FaceSnap) : Observable<FaceSnap> {
      return this.http.post<FaceSnap>(
        `http://localhost:3000/facesnaps`, faceSnap
      );
    }*/


  addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      //Rappel l'operateur map va transformer notre observale
      //On retourne un tableau trié par ID pour s'assurer que le dernier élément du tableau possède l'ID le plus élevé.
      map(facesnaps => [...facesnaps].sort((a,b) => a.id - b.id)),
      //On retourne ensuite le dernier élément de ce tableau.
      map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
      //On retourne le nouveau FaceSnap avec son ID valable.
      map(previousFacesnap => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: previousFacesnap.id + 1
      })),
      //Le dernier opérateur,  switchMap()  , génère la requête POST finale
      switchMap(newFacesnap => this.http.post<FaceSnap>(
        'http://localhost:3000/facesnaps',
        newFacesnap)
      )
    );
  }


}
