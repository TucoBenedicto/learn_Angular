import { SnapType } from "./snap-type.type";

export class FaceSnap {

//il y a 2 maniere de creer le constructeur

  //Methode 1 : plus courte à l'aide de "public"

  location ?:string ;//propriétés optionnelles "?"
  id : string; 

  constructor(public title: string,
              public description: string,
              public imageUrl: string,
              public createdAt: Date,
              public snaps: number) {
                //id dans le constructeur permet d'assigner et de generer directement une ID avec randomUUID
                //desormais chaque "face Snape" a une id
                this.id = crypto.randomUUID().substring(0,8); // randomUUID permet de générer un identifiant universellement unique (UUID).
                console.log(this)
              }


  //Methode 2 : plus longue
  /*
  title: string;
  description: string;
  createdAt: Date;
  snaps: number;
  imageUrl: string;
  snapButtonText: string;
  userHasSnapped: boolean;

  
  constructor(
    title: string,
    description: string,
    createdAt: Date,
    snaps: number,
    imageUrl: string,
    snapButtonText: string,
    userHasSnapped: boolean
  ) {
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.snaps = snaps;
    this.imageUrl = imageUrl;
    this.snapButtonText = snapButtonText;
    this.userHasSnapped = userHasSnapped;
  }
*/

addSnap():void{
    this.snaps++;
}
removeSnap():void{
    this.snaps--;
}

snap(snapType : SnapType){

  if (snapType === 'snap') {
    this.addSnap();
  } else if (snapType === 'unsnap') {
    this.removeSnap();
  }

}

//propriétés optionnelles
setLocation(location:string):void{
  this.location = location; 
}
//la difference entre setLoction et withLocation est que ce dernier retourne "FaceSnap"
/*
cela nous permet d'ajouter la localisation au FaceSnap sans avoir besoin d'un contexte où l'on pourrait appeler  setLocation
Cette approche permet de configurer un objet lors de son instantiation, et d'une manière très lisible ! Notre tableau contient donc un FaceSnap avec sa localisation.
*/
withLocation(location: string): FaceSnap {
  this.setLocation(location);
  return this;
}


}
