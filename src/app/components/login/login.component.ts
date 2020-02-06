import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { AppState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new Login(payload));
  }

}
