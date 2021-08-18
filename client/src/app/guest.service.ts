import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrentUser } from './currentUser';

interface User {
  access_code: string;
  email: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  authenticateGuest(access_code: string): void {
    this.getGuest(access_code)
    .subscribe((data: User) => {
      this.currentUser.access_code = data.access_code;
      this.currentUser.email = data.email;
      this.currentUser.username = data.username;
      this.currentUser.authenticated = 1;
    });
  }

  logoutGuest() {
    this.currentUser.authenticated = 0;
    this.currentUser.access_code = "";
    this.currentUser.email = "";
    this.currentUser.username = "";
  }

  getGuest(access_code: string) {
      return this.http.get<User>(`http://192.168.0.34:7318/user/${access_code}`);
  }

  updateUser(updates: any) {
      this.http.post(`http://192.168.0.34:7318/user/${this.currentUser.access_code}`, updates).subscribe(data => {
          this.authenticateGuest(this.currentUser.access_code);
      });
  }

  constructor(private http: HttpClient, private currentUser: CurrentUser) { }
}
