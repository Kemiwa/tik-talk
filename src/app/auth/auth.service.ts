// Auth service for website
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from './auth.interface';
import {tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  http = inject(HttpClient)
  cookieService = inject(CookieService) // Saving token in cookies
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';


  token: string | null = null;
  refreshToken: string | null = null;

// Checking if you are signed up
  get isAuth(){
    if (!this.token){
      this.token = this.cookieService.get('token');
    }

    return !!this.token
  }
  // Sending login and password to backend to receive a respond
  login(payLoad: {username: string, password: string}){
    const fd = new FormData();

    fd.append('username', payLoad.username)
    fd.append('password', payLoad.password)

    return  this.http.post<TokenResponse>(
      `${this.baseApiUrl}token`,
      fd
    ).pipe(
      tap(val => {
        this.token = val.access_token
        this.refreshToken = val.refresh_token

        this.cookieService.set('token', val.access_token)
        this.cookieService.set('refreshToken', val.refresh_token)
      })
    )
  }
}
