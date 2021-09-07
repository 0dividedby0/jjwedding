import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CurrentParty } from './currentParty';

interface Party {
    access_code: string;
    email: string;
    party: string;
    responded: boolean;
    admin: boolean;
}
interface Guest {
    access_code: string;
    name: string;
    rsvp: boolean;
    guest_id: number;
}

@Injectable({
    providedIn: 'root'
})
export class GuestService {
    static prod = true;
    static rootURL: string = GuestService.prod ? "http://75.172.128.175:7318" : "http://192.168.0.34:7318";

    private authenticationChangedSource = new Subject<boolean>();
    authenticationChanged$ = this.authenticationChangedSource.asObservable();

    authenticateParty(access_code: string): void {
        this.getParty(access_code)
        .subscribe((data: Party) => {
            this.currentParty.access_code = data.access_code;
            this.currentParty.email = data.email;
            this.currentParty.party = data.party;
            this.currentParty.responded = data.responded ? true : false;
            this.currentParty.admin = data.admin ? true : false;
            localStorage.setItem("accessCode", data.access_code);

            this.getGuests(data.access_code);
            
            this.currentParty.authenticated = true;
            this.authenticationChangedSource.next(this.currentParty.authenticated);
        });
    }

    logoutParty() {
        this.currentParty.authenticated = false;
        this.currentParty.access_code = "";
        this.currentParty.email = "";
        this.currentParty.party = "";
        this.currentParty.responded = false;
        this.currentParty.admin = false;
        this.currentParty.guests = [];
        localStorage.removeItem("accessCode");
        this.authenticationChangedSource.next(this.currentParty.authenticated);
    }

    getParty(access_code: string) {
        return this.http.get<Party>(`${GuestService.rootURL}/party/${access_code}`);
    }

    updateParty(updates: any) {
        this.http.post(`${GuestService.rootURL}/party/${this.currentParty.access_code}`, updates).subscribe(data => {
            this.authenticateParty(this.currentParty.access_code);
        });
    }

    getGuests(access_code: string) {
        console.log("Getting guests");
        this.http.get<[Guest]>(`${GuestService.rootURL}/guests/${access_code}`).subscribe((data: [Guest]) => {
            this.currentParty.guests = data;
        });
    }

    updateGuests() {
        this.http.post(`${GuestService.rootURL}/guests`, this.currentParty.guests).subscribe(data => {
            console.log("Updated guests");
        });
    }

    getAllPartiesAndGuests() {
        if (this.currentParty.admin) return this.http.get<{parties: [Party], guests: [Guest]}>(`${GuestService.rootURL}/admin/${this.currentParty.access_code}`);
        else return null;
    }

    constructor(private http: HttpClient, private currentParty: CurrentParty) { }
}
