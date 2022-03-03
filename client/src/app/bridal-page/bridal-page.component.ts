import { Component, OnInit } from '@angular/core';
import { CurrentParty } from '../currentParty';
import { GuestService } from '../guest.service';

interface Party {
  access_code: string;
  email: string;
  party: string;
  responded: boolean;
  admin: boolean;
  bridal_shower: boolean;
  shower_responded: boolean;
}
interface Guest {
  access_code: string;
  name: string;
  rsvp?: boolean;
  guest_id: number;
  shower_rsvp: boolean;
  dinner_rsvp?: boolean;
  reunion_rsvp?: boolean;
  games_rsvp?: boolean;
}

@Component({
  selector: 'app-bridal-page',
  templateUrl: './bridal-page.component.html',
  styleUrls: ['./bridal-page.component.css']
})
export class BridalPageComponent implements OnInit {

  currentParty: CurrentParty;
  adminData: { [key: string]: {party: Party, guests: [Guest?]} } = {};

  constructor(private guestService: GuestService, currentParty: CurrentParty) { 
    guestService.authenticationChanged$.subscribe(authenticated => {
      if (authenticated){
        this.guestService.getAllPartiesAndGuests()?.subscribe((data: {parties: [Party], guests: [Guest]}) => {
            this.updateAdminData(data);
        });
      }
    });
    this.currentParty = currentParty
  }

  updateAdminData(data: {parties: [Party], guests: [Guest]}) {
    data.parties.forEach(party => {
        this.adminData[party.access_code] = {party: party, guests: []};
    });
    data.guests.forEach(guest => {
        this.adminData[guest.access_code].guests.push(guest);
    });
  }

  submitRSVP() {
    console.log(`Updating RSVP: ${this.currentParty.shower_responded}`);
    if (this.currentParty.shower_responded){
      this.guestService.updateParty({shower_responded: 0});
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
      this.guestService.updateParty({shower_responded: 1});
    }
  }

  ngOnInit(): void {
    let registryScript = document.createElement('script');
    registryScript.id = 'script_myregistry_giftlist_iframe'
    registryScript.src = '//www.myregistry.com//Visitors/GiftList/iFrames/EmbedRegistry.ashx?r=qQGMRuDK3xi6uF6WFYKp2Q2&v=2';
    registryScript.type = 'text/javascript';
    document.getElementById('registryContent')!.appendChild(registryScript);
  }
}
