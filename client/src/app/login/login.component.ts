import { Component, OnInit } from '@angular/core';
import { GuestService } from '../guest.service';
import { CurrentParty } from '../currentParty';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    currentParty: CurrentParty;
    access_code: string;
    email: string;
    accountWindowShowing: boolean;

    constructor(private guestService: GuestService, currentParty: CurrentParty) { 
        this.currentParty = currentParty;
        this.email = "";
        this.access_code = "";
        if (localStorage.getItem("accessCode")) {
            this.access_code = localStorage.getItem("accessCode") || "";
            this.authenticateUser();
        }
        this.accountWindowShowing = false;
    }

    authenticateUser() {
        if (this.access_code.length == 4 && this.access_code.match(/^[0-9a-zA-Z]+$/)){
            this.guestService.authenticateGuest(this.access_code);
        }
        else {
            alert("Access codes can only contain 4 letters or numbers");
        }
    }

    logoutUser() {
        this.guestService.logoutGuest();
    }

    updateEmail() {
        this.guestService.updateParty({email: this.email});
        this.guestService.authenticateGuest(this.access_code);
    }

    ngOnInit(): void {
        
    }
}
