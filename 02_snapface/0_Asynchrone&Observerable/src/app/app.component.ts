import { Component, OnInit } from '@angular/core';
import { interval, Observable, of} from 'rxjs';
import{filter, map, tap,  concatMap, mergeMap, delay, exhaustMap, switchMap, take } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  //*Creation d'un observable
  //Objectif de l'observable : il permet de gerer l'asynchrone (au lieu des callback/promise et async/await)
  //Un Observable est un objet qui émet des valeurs au cours du temps. on peut observer un Observable et réagir à ses émissions – c'est d'ailleurs tout l'intérêt !
  //Souscription à un observable : soit avec la méthode  subscribe() (dans le code typescript) ou le pipe  async (dans le template) , est très important – vous vous en servirez très, très souvent.
  //Attention la norme est d'ajouter un  "$"  à la fin du nom de toute variable qui contient un Observable.
  //Quand on déclare le type de  interval$  , on le déclare comme  Observable  qui émet des  number  en passant  number  entre chevrons <>  .
  interval$! : Observable<string>;

  redTrainsCalled = 0;
  yellowTrainsCalled = 0;


  ngOnInit() {
    //! Obervable Bas Niveau
    //Manipulez les émissions avec les opérateurs bas niveau
    //on utilise "pipe" pour "brancher" les operateurs a l'observable , Les opérateurs sont passés à la fonction  pipe()  des Observables
    //attention l'ordre des operateurs doit etre respecter sous peine d'erreur
    this.interval$ = interval(1000).pipe(
      //l'operateur de bas niveau "filter" va filtrer/afficher les emissions de l'observale , ici on filtre/affiche que ce divisible par 3
      filter(value => value % 3 ===0),
      //l'operateur de bas niveau "map" permet de transformer les émissions d'un Observable
      map(value =>(value % 2 === 0 ? `${value} je suis paire`:`${value} je suis impaire`)),
      //l'operateur de bas niveau "tap" crée un effet secondaire c'est une fonction qui fait quelque chose avec les émissions d'un Observable sans les modifier.
      tap(value => this.logger(value))
    );

    //! Obervable Haut Niveau
    //Role : s'agit d'un Observable qui souscrit à d'autres Observables.
    //Cas d'utilisation :
      /*
      Données utilisateur : Un observable de haut niveau peut centraliser les informations sur l'utilisateur connecté (nom, email, permissions). Ce flux est partagé dans toute l'application pour que tous les composants y accèdent facilement.
      Chargement de données depuis une API : Lorsqu'une application doit charger des données depuis une API (par exemple, une liste de produits), un observable de haut niveau permet de stocker et distribuer ces données de manière centralisée, évitant des appels répétitifs et assurant que toutes les parties de l'application aient les mêmes informations.
      Gestion de l'état de connexion : Un observable de haut niveau peut suivre l'état de connexion (connecté ou déconnecté) et notifier les composants ou services concernés lorsque cet état change, par exemple pour rediriger l'utilisateur en cas de déconnexion.
      Notifications en temps réel : Si une application a un système de notifications, un observable de haut niveau peut gérer le flux de nouvelles notifications, les distribuant à différents composants pour qu’ils les affichent en temps réel.
      */
      interval(500).pipe(
        take(10),
        map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
        tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),

      //*LES 4 observable hauts niveaux
      //mergeMap n'attend pas qu'un Observable intérieur complète pour souscrire au suivant – il assure la mise en parallèle.
      //mergeMap(color => this.getTrainObservable$(color)),

      //concatMap attend que l'Observable intérieur complète avant de souscrire au suivant – il assure la mise en série, même lorsque l'Observable extérieur émet plusieurs fois.
      //concatMap(color => this.getTrainObservable$(color)),

      //exhaustMap ignore toute nouvelle émission de l'Observable extérieur tant qu'il y a une souscription active à un Observable intérieur.
      //exhaustMap(color => this.getTrainObservable$(color)),

      //switchMap reçoit une nouvelle émission de l'Observable extérieur, s'il y a une souscription active à un Observable intérieur, il l'annule et souscrit au suivant.
      switchMap(color => this.getTrainObservable$(color)),

      tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`, `font-weight: bold; color: ${this.translateColor(train.color)}`))
    ).subscribe();


  }

  //Méthode qui sera utiliser pour l'opérateur d'effet secondaire tap (obervable bas niveau)
  logger(value: string): void{console.log(`Log : ${value}`);}


  //Méthode utilisé pour les observale haut niveau
  getTrainObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain = color === 'rouge';
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
    const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
    console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`);
    return of({ color, trainIndex }).pipe(
      delay(isRedTrain ? 5000 : 6000)
    );
  }

  translateColor(color: 'rouge' | 'jaune') {
    return color === 'rouge' ? 'red' : 'yellow';
  }

}
