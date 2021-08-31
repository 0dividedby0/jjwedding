import { Component, OnInit } from '@angular/core';
import { GuestService } from '../guest.service';
import { CurrentParty } from '../currentParty';

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
        console.log(`Updating RSVP: ${this.currentParty.responded}`);
        if (this.currentParty.responded){
            this.guestService.updateParty({responded: 0});
        }
        else {
            this.guestService.updateGuests();
            this.guestService.updateParty({responded: 1});
        }
    }

    ngOnInit(): void {
    }

}
