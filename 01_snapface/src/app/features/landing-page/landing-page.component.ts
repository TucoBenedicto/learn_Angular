import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-component',
  standalone: true,
  imports: [

  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  //injection de router pour l'utiliser dans onContinue
  constructor(private router : Router){}

  //Creation d'une route/lien programatiquement (sans RouterLink)
  //Rappel sur les Event : Le nom de méthode commence toujours par "on" signale que cette méthode répond à un événement (clique d'un bouton).
  onContinue(){
    this.router.navigateByUrl("facesnaps")
  }

}
