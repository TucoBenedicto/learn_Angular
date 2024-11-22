import { Component, OnInit } from '@angular/core';
import { FaceSnapComponent } from './features/face-snap/face-snap.component';
import { FaceSnap } from './models/face-snap';
import { FaceSnapListComponent } from "./features/face-snap-list/face-snap-list.component";
import { HeaderComponent } from "./layouts/header/header.component";
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HeaderComponent, RouterOutlet, LandingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent{

}
