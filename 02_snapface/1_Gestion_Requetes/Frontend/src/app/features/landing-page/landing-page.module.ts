import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";



@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    FormsModule,//pour la gestion des formulaires template
  ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingPageModule { }
