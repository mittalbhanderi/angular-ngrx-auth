import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AuthCookieService {

  constructor() { }

  getAuth(): null | string {
    return Cookie.get('token') || null;
  }

  setAuth(value: string): void {
      // 0.0138889 - this accept day not minuts
      Cookie.set('token', value, 0.0138889);
  }

  deleteAuth(): void {
      Cookie.delete('token');
  }

}
