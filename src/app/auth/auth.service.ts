// Auth service for website
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from './auth.interface';
import {catchError, tap, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  http = inject(HttpClient)
  router = inject(Router)
  cookieService = inject(CookieService) // Saving token in cookies
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';


  token: string | null = null;
  refreshToken: string | null = null;

// Checking if you are signed up
  get isAuth(){
    if (!this.token){
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }

    return !!this.token
  }
  // Sending login and password to backend to receive a response
  login(payLoad: {username: string, password: string}){
    const fd = new FormData();

    fd.append('username', payLoad.username)
    fd.append('password', payLoad.password)

    return  this.http.post<TokenResponse>(
      `${this.baseApiUrl}token`,
      fd
    ).pipe(
      tap(val => this.saveTokens(val))
    )
  }

  refreshAuthToken() {
    return  this.http.post<TokenResponse>(
      `${this.baseApiUrl}refresh`,
      {
        refresh_token: this.refreshToken
      }
    ).pipe(
      tap(val => this.saveTokens(val)),
      catchError(error => {
        this.logout()
        return throwError(error);
      })
    )
  }
  // Logout Method
  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  // Refreshing token method
  saveTokens(res: TokenResponse) {
    this.token = res.access_token
    this.refreshToken = res.refresh_token

    this.cookieService.set('token', this.token)
    this.cookieService.set('refreshToken', this.refreshToken)
  }
}
