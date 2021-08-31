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
            var alertString: string = "";
            this.currentParty.guests.forEach(guest => {
                if (guest.name.match(/"\+[0-9]"/g)) alertString += `Please provide a name for ${guest.name}!\n`;
                else if (!guest.name.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) alertString += `Please provide a different name for "${guest.name}"!\n- No special characters (&,#,@,etc.)\n`
            });
            if (alertString.length > 0){
                alert(alertString);
                return;
            }
            this.guestService.updateGuests();
            this.guestService.updateParty({responded: 1});
        }
    }

    ngOnInit(): void {
    }

}
