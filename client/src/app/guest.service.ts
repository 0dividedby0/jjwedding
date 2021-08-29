import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrentParty } from './currentParty';

interface Party {
    access_code: string;
    email: string;
    party: string;
}
interface Guest {
    access_code: string;
    name: string;
    rsvp: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class GuestService {
    authenticateParty(access_code: string): void {
        this.getParty(access_code)
        .subscribe((data: Party) => {
            this.currentParty.authenticated = 1;
            this.currentParty.access_code = data.access_code;
            this.currentParty.email = data.email;
            this.currentParty.party = data.party;
            localStorage.setItem("accessCode", data.access_code);

            this.getGuests(data.access_code).subscribe((data: [Guest]) => {
                this.currentParty.guests = data;
            });
        });
    }

    logoutParty() {
        this.currentParty.authenticated = 0;
        this.currentParty.access_code = "";
        this.currentParty.email = "";
        this.currentParty.party = "";
        this.currentParty.guests = [];
        localStorage.removeItem("accessCode");
    }

    getParty(access_code: string) {
        // return this.http.get<User>(`http://75.172.128.175:7318/party/${access_code}`);
        return this.http.get<Party>(`http://192.168.0.34:7318/party/${access_code}`);
    }

    updateParty(updates: any) {
        // this.http.post(`http://75.172.128.175:7318/party/${this.currentParty.access_code}`, updates).subscribe(data => {
        this.http.post(`http://192.168.0.34:7318/party/${this.currentParty.access_code}`, updates).subscribe(data => {
            this.authenticateParty(this.currentParty.access_code);
        });
    }

    getGuests(access_code: string) {
        console.log("Getting guests");
        // return this.http.get<User>(`http://75.172.128.175:7318/guests/${access_code}`);
        return this.http.get<[Guest]>(`http://192.168.0.34:7318/guests/${access_code}`);
    }

    updateGuests() {
        // this.http.post(`http://75.172.128.175:7318/guests, this.currentParty.guests).subscribe(data => {
        this.http.post(`http://192.168.0.34:7318/guests`, this.currentParty.guests).subscribe(data => {
            console.log("Updated guests");
        });
    }

    constructor(private http: HttpClient, private currentParty: CurrentParty) { }
}
