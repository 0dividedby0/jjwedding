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

    constructor(private guestService: GuestService, currentUser: CurrentUser) { 
        this.currentUser = currentUser;
        this.access_code = "";
    }

    authenticateUser() {
        this.guestService.authenticateGuest(this.access_code);
    }

    ngOnInit(): void {
        
    }
}
