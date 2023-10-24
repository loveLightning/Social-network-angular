import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const USER_TOKEN = 'accessToken';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private cookieService: CookieService) {}

  cleanAccessToken() {
    this.cookieService.delete(USER_TOKEN);
  }

  setAccessToken(accessToken: string) {
    this.cookieService.set(USER_TOKEN, JSON.stringify(accessToken));
  }

  getAccessToken() {
    const accessToken = this.cookieService.get(USER_TOKEN);

    if (accessToken) {
      return JSON.parse(accessToken);
    }

    return null;
  }

  isSignedInOnTheClient() {
    const accessToken = this.cookieService.get(USER_TOKEN);

    return !!accessToken;
  }
}
