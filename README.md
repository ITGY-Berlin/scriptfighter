# Scriptfighter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.4.

## calculation of actions

player-one vs player-two

- _player-one_ attacks _player-two_ and _player-two_ trying to move (backward or forward) => _player-two_ will be hitted and is stuned (can not move while stunned)
- _player-one_ moves forward and _player-two_ stay => _player-one_ will move _player-two_ for one position in the corner direction until the _player-two_ hit the corner
- _player-one_ will attack _player-two_ and _player-two_ is attacking _player-one_ at the same time => both will be hitted and get stunned.
- _player-one_ attacking _player-two_ but _player-two_ is blocking => _player-two_ will reduce the damage of the attack and will not be stunned.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
