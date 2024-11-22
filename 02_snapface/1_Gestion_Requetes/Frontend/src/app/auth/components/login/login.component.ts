import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //LoginComponent aura besoin de AuthService et du Router, donc injectez-les
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  //et créez une méthode onLogin() pour réagir aux clics sur le bouton de connexion
  onLogin(){
    this.auth.login()
    this.router.navigateByUrl('/facesnaps')
  }

}
