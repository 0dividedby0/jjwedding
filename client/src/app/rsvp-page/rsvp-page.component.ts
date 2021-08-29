import { Component, OnInit } from '@angular/core';
import { GuestService } from '../guest.service';
import { CurrentParty } from '../currentParty';

interface Guest {
    access_code: string;
    name: string;
    rsvp: boolean;
}

@Component({
  selector: 'app-rsvp-page',
  templateUrl: './rsvp-page.component.html',
  styleUrls: ['./rsvp-page.component.css']
})
export class RsvpPageComponent implements OnInit {

    currentParty: CurrentParty;

    constructor(private guestService: GuestService, currentParty: CurrentParty) {
        this.currentParty = currentParty;
    }

    submitRSVP() {
        this.guestService.updateGuests();
    }

    ngOnInit(): void {
    }

}
