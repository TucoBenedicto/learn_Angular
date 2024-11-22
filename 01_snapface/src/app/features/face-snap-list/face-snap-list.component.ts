import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../../models/face-snap';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnapsService } from '../../services/face-snaps.service';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [FaceSnapComponent],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit{

    //grace au model FaceSnap on peux utiliser ses attributs dans la class parent , pour qu'elle soit utiliser dans tous les components enfants
    faceSnaps!: FaceSnap[];

    /*
    l'utilisation d'un constructeur va nous permettre l'injection de dependance
    en l'occurence d'utiliser les données dans présente dans "face-snaps.services"
    */
    /*
    On préfère généralement  private (à public) pour les injections de service, car ça empêche le template du component d'y accéder directement. Donner au template accès aux injections serait un anti-pattern Angular – autrement dit, une approche plus que déconseillée, souvent pour des raisons qui ne sont pas flagrantes au premier abord.
    */
    constructor(private faceSnapsService:FaceSnapsService){}

    ngOnInit(): void {
      this.faceSnaps = this.faceSnapsService.getFaceSnaps();
    }

}
