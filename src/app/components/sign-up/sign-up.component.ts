import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { Signup } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: User = new User();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new Signup(payload));
    // console.log(this.user);
  }

}
