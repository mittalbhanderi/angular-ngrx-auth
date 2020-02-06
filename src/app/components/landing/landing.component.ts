import { Component, OnInit } from '@angular/core';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/store/actions/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: false;
  user = null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      this.user = state.user;
      this.isAuthenticated = state.isAuthenticated;
    });
  }

  logOut() {
    this.store.dispatch(new Logout());
  }

}
