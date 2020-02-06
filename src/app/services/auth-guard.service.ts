import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthCookieService } from './auth-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthCookieService, private router: Router) { }

  canActivate(): boolean {
    if (!this.auth.getAuth()) {
      this.router.navigateByUrl('/log-in');
      return false;
    }
    return true;
  }
}
