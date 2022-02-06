import { Component, OnInit } from '@angular/core';
import { GuestService } from '../guest.service';
import { CurrentParty } from '../currentParty';
import { HostListener } from '@angular/core';

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
        this.accountWindowShowing = false;
        if (localStorage.getItem("accessCode")) {
            this.access_code = localStorage.getItem("accessCode") || "";
            this.authenticateParty();
        }
        else {
            this.accountWindowShowing = true;
        }
    }

    authenticateParty() {
        if (this.access_code.length == 4 && this.access_code.match(/^[0-9a-zA-Z]+$/)){
            this.guestService.authenticateParty(this.access_code);
        }
        else {
            alert("Access codes can only contain 4 letters or numbers");
        }
    }

    logoutUser() {
        this.guestService.logoutParty();
    }

    updateEmail() {
        this.guestService.updateParty({email: this.email});
        this.guestService.authenticateParty(this.access_code);
    }

    @HostListener('document:keydown.escape', ['$event']) handleKeyboardEvent(event: KeyboardEvent) { 
        this.accountWindowShowing = false;
    }

    ngOnInit(): void {
    }
}
