import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrentParty } from './currentParty';

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
      this.currentParty.access_code = data.access_code;
      this.currentParty.email = data.email;
      this.currentParty.username = data.username;
      this.currentParty.authenticated = 1;
      localStorage.setItem("accessCode", data.access_code);
    });
  }

  logoutGuest() {
    this.currentParty.authenticated = 0;
    this.currentParty.access_code = "";
    this.currentParty.email = "";
    this.currentParty.username = "";
    localStorage.removeItem("accessCode");
  }

  getGuest(access_code: string) {
      // return this.http.get<User>(`http://75.172.128.175:7318/party/${access_code}`);
      return this.http.get<User>(`http://192.168.0.34:7318/party/${access_code}`);
  }

  updateParty(updates: any) {
      // this.http.post(`http://75.172.128.175:7318/party/${this.currentParty.access_code}`, updates).subscribe(data => {
      this.http.post(`http://192.168.0.34:7318/party/${this.currentParty.access_code}`, updates).subscribe(data => {
          this.authenticateGuest(this.currentParty.access_code);
      });
  }

  constructor(private http: HttpClient, private currentParty: CurrentParty) { }
}
