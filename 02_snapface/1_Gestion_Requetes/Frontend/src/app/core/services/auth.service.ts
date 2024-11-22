import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token !: string;

  login():void{
    // Etant donnée que nous n'avons pas de systeme d'authentification , on va creer un faux token pour tester l'interceptore
    this.token = 'MyFakeToken';
  }

  getToken(): string {
    return this.token;
  }
}
