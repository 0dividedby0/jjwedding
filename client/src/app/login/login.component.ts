import { Component, OnInit } from '@angular/core';
import { GuestService } from '../guest.service';
import { CurrentUser } from '../currentUser';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    currentUser: CurrentUser;
    access_code: string;
    email: string;
    accountWindowShowing: boolean;

    constructor(private guestService: GuestService, currentUser: CurrentUser) { 
        this.currentUser = currentUser;
        this.access_code = "";
        this.email = "";
        this.accountWindowShowing = true;
    }

    authenticateUser() {
        this.guestService.authenticateGuest(this.access_code);
    }

    logoutUser() {
        this.guestService.logoutGuest();
    }

    updateEmail() {
        this.guestService.updateUser({email: this.email});
    }

    ngOnInit(): void {
        
    }
}
