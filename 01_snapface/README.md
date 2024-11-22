# Themes abordées

- vous découvrirez les briques de base d’une application Angular que sont les **components**

- vous passerez des données aux components avec la **liaison de données**

- vous réagissez aux événements du template avec la **liaison par événement**

- vous apporterez de la structure et de la forme à vos components avec le **control flow**, les **directives** et les **pipes**

- vous implémenterez des **services** et du **routing** pour améliorer la structure de votre application

# Create application

    - ng new myApp

# Start server

    - ng serve

# Create componante

    - ng generate component nom-du-component / ng g c nom-du-component

# Handle componant

    - Create the componant with the command above
    - import the component in "app.component.ts", ex: imports: [FaceSnapComponent],
    - add component in "app.component.html", ex : <app-face-snap></app-face-snap>

---------------------------------------------

# Snapface

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
