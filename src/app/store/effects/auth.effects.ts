import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  Signup,
  SignupFailure,
  SignupSuccess,
  Logout,
  GetStatus
} from '../actions/user.actions';
import { AuthCookieService } from 'src/app/services/auth-cookie.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private authCookieService: AuthCookieService,
    private router: Router
  ) {}

  // effects go here
  @Effect()
  Login: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: Login) => action.payload),
    switchMap((payload: any) => {
      return this.authService
        .logIn(payload.email, payload.password)
        .pipe(map((user: any) => {
          console.log(user);
          return new LoginSuccess({ token: user.token, email: payload.email });
        }),
        catchError(error => {
          console.log(error);
          return of(new LoginFailure({ error }));
        }));
    })
  );

  @Effect({ dispatch: false })
  LoginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user: any) => {
      // localStorage.setItem('token', user.payload.token);
      this.authCookieService.setAuth(user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({dispatch: false})
  LoginFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );


  @Effect()
  Signup: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: Signup) => action.payload),
    switchMap((payload: any) => {
      return this.authService
        .signup(payload.email, payload.password)
        .pipe(map((user: any) => {
          console.log(user);
          return new SignupSuccess({ token: user.token, email: payload.email });
        }),
        catchError(error => {
          console.log(error);
          // tslint:disable-next-line: object-literal-shorthand
          return of(new SignupFailure({ error: error }));
        }));
    })
  );

  @Effect({ dispatch: false })
  SignupSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user: any) => {
      // localStorage.setItem('token', user.payload.token);
      this.authCookieService.setAuth(user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({dispatch: false})
  SignupFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({dispatch: false})
  Logout: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      // localStorage.removeItem('token');
      this.authCookieService.deleteAuth();
      this.router.navigateByUrl('/');
    })
  );

  @Effect({dispatch: false})
  GetStatus: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_STATUS),
    map((action: GetStatus) => action),
    switchMap(payload => this.authService.getStatus())
  );

}
