import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, //va nous permettre de creer des liens/routes vers les autres pages
    RouterLinkActive //permet d'attribuer une classe CSS au lien quand sa route est la route active
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
