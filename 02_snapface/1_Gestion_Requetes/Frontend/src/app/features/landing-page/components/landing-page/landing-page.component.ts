import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  //attribut pour le Template forms
  userEmail !: string;
  //Le two-way binding lie totalement la valeur de la variable à la valeur du  <input>  . Si vous y attribuez une valeur depuis le TypeScript :
  //userEmail : string = 'frrgg@gmail.com'; => permet de tester le two way binding

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onContinue(): void {
    this.router.navigateByUrl('facesnaps');
  }

  //Le type  NgForm  expose un attribut  value  qui correspond à un objet contenant les champs du formulaire avec leur attribut  'name'  et les valeurs contenues dans ces champs.
  onSubmitForm(form:NgForm): void {
    console.log(form.value)
  }

}
