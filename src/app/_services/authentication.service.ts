import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "../../environments/environment";
import { User } from "../_models";

const headers = new HttpHeaders({
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
});

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private refreshTokenTimeout: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.userSubject = new BehaviorSubject<User>(new User());
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/login?sUsername=NEWAGEDEMO`, {})
      .pipe(
        map((user) => {
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          this.setToken("jwtToken", user.Token);
          return user;
        })
      );
  }

  logout() {
    this.http
      .post<any>(
        `${environment.apiUrl}/users/revoke-token`,
        {},
        { withCredentials: true }
      )
      .subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(new User());
    this.router.navigate(["/login"]);
  }

  refreshToken() {
    this.setToken(
      "jwtToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ik5FV0FHRURFTU8iLCJuYmYiOjE2MTY2NzUzNTAsImV4cCI6MTY0ODIxMTM1MCwiaWF0IjoxNjE2Njc1MzUwfQ.VuKb17W6THnmcdVEZpPMtWK736Zmoi4WuEATQNMyS_c"
    );
    const refreshToken = this.localStorageService.getItem("jwtToken");
    return this.http
      .get<any>(`${environment.apiUrl}/getauthtoken?user_token=${refreshToken}`)
      .pipe(
        map((user) => {
          this.userSubject.next(user);
          this.setToken("refreshToken", user.Token);
          return user;
        })
      );
  }

  startRefreshTokenTimer() {
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      60 * 10 * 1000
    );
  }

  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  setToken(key: string, token: string): void {
    this.localStorageService.setItem(key, token);
  }
}
