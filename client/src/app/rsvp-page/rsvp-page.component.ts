import { Component, OnInit, HostListener } from '@angular/core';
import { GuestService } from '../guest.service';
import { CurrentParty } from '../currentParty';

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

@Component({
  selector: 'app-rsvp-page',
  templateUrl: './rsvp-page.component.html',
  styleUrls: ['./rsvp-page.component.css']
})
export class RsvpPageComponent implements OnInit {

    currentParty: CurrentParty;
    suggestedSong: string;
    userComment: string; 
    adminData: { [key: string]: {party: Party, guests: [Guest?]} } = {};

    constructor(private guestService: GuestService, currentParty: CurrentParty) {
        guestService.authenticationChanged$.subscribe(authenticated => {
            if (authenticated){
                this.guestService.getAllPartiesAndGuests()?.subscribe((data: {parties: [Party], guests: [Guest]}) => {
                    this.updateAdminData(data);
                });
            }
        });
        this.currentParty = currentParty;
        this.suggestedSong = "";
        this.userComment = "";
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
            if (this.suggestedSong != "") { 
                if (!this.suggestedSong.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.!?&'-]+$/u)) {
                    alertString += `Invalid song name "${this.suggestedSong}"!\n- No special characters (&,#,@,etc.)\n`;
                }
                else {
                    var currentDate = new Date();
                    this.guestService.postComment({
                        author: this.currentParty.party, 
                        message: `Song suggestion: ${this.suggestedSong}!`, 
                        time: `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`, 
                        system_message: true,
                        id: -1
                    })
                    .subscribe(data => {
                        console.log("Posted comment");
                    });
                }
            }
            if (this.userComment != "") { 
                if (!this.userComment.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.!?&'-]+$/u)) {
                    alertString += `Invalid comment "${this.userComment}"!\n- No special characters (*,#,@,etc.)\n`;
                }
                else {
                    var currentDate = new Date();
                    this.guestService.postComment({
                        author: this.currentParty.party, 
                        message: this.userComment, 
                        time: `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`, 
                        system_message: false,
                        id: -1
                    })
                    .subscribe(data => {
                        console.log("Posted comment");
                    });
                }
            }
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
