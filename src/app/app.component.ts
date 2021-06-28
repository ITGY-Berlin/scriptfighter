import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { userLoadFirebase } from './shared/store/actions/user.actions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'scriptfighter';

  constructor(private store: Store) {
    this.store.dispatch(userLoadFirebase());
  }
}
