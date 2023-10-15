import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const USER_TOKEN = 'accessToken';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private cookieService: CookieService) {}

  clean() {
    this.cookieService.delete(USER_TOKEN);
  }

  public saveUser(accessToken: string) {
    this.cookieService.set(USER_TOKEN, JSON.stringify(accessToken));
  }

  public getUser() {
    const user = this.cookieService.get(USER_TOKEN);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const user = this.cookieService.get(USER_TOKEN);

    if (user) {
      return true;
    }

    return false;
  }
}
