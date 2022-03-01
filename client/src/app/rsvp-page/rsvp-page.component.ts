import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { GuestService } from '../guest.service';
import { CurrentParty } from '../currentParty';
import {} from 'googlemaps';
import { KeyValue } from '@angular/common';

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
    rsvp: boolean;
    guest_id: number;
    shower_rsvp: boolean;
    dinner_rsvp: boolean;
    reunion_rsvp: boolean;
    games_rsvp: boolean;
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
    userZipCode: string;
    warningPopupShowing: boolean = false;
    currentPage: number = 1;
    adminData: { [key: string]: {party: Party, guests: [Guest?]} } = {};

    canDeactivate(): Observable<boolean> | boolean {
        if (this.currentParty.responded) return true;
        this.warningPopupShowing = true;
        return false;
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (!this.canDeactivate()) {
            $event.returnValue = "Your response has not been recorded! Please press 'Submit' to record your response!";
        }
    }

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
        this.userZipCode = "";
    }

    updateAdminData(data: {parties: [Party], guests: [Guest]}) {
        data.parties.forEach(party => {
            this.adminData[party.access_code] = {party: party, guests: []};
        });
        data.guests.forEach(guest => {
            this.adminData[guest.access_code].guests.push(guest);
        });
    }

    navRSVP(forward: boolean) {
        switch (this.currentPage) {
            case 1: //Wedding RSVP
                if (forward) {
                    var alertString: string = "";
                    var allDeclined: boolean = true;
                    this.currentParty.guests.forEach(guest => {
                        if (guest.rsvp) allDeclined = false;

                        if (guest.name.match(/"\+[0-9]"/g)) alertString += `Please provide a name for ${guest.name}!\n`;
                        else if (!guest.name.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) alertString += `Please provide a different name for "${guest.name}"!\n- No special characters (&,#,@,etc.)\n`
                    });
                    if (alertString.length > 0) alert(alertString);
                    else allDeclined ? this.currentPage = 5 : this.currentPage = 2;
                }
                break;
            case 2: //Dinner RSVP
                forward ? this.currentPage = 3 : this.currentPage = 1;
                break;
            case 3: //Afterparty RSVP
                if (forward) {
                    var allDeclined: boolean = true;
                    this.currentParty.guests.forEach(guest => {
                        if (guest.reunion_rsvp) allDeclined = false;
                        else guest.games_rsvp = false;
                    });
                    allDeclined ? this.currentPage = 5 : this.currentPage = 4;
                } else this.currentPage = 2;
                break;
            case 4: //Games RSVP
                forward ? this.currentPage = 5 : this.currentPage = 3;
                break;
            case 5: //Optionals
                if (!forward) {
                    var allDeclined: boolean = true;
                    this.currentParty.guests.forEach(guest => { if (guest.rsvp) allDeclined = false; });
                    if (allDeclined) this.currentPage = 1
                    else {
                        var allDeclined: boolean = true;
                        this.currentParty.guests.forEach(guest => { if (guest.reunion_rsvp) allDeclined = false; });
                        allDeclined ? this.currentPage = 3 : this.currentPage = 4;
                    }
                }
                break;
            default:
                break;
        }
    }

    submitRSVP() {
        console.log(`Updating RSVP: ${this.currentParty.responded}`);
        if (this.currentParty.responded){
            this.guestService.updateParty({responded: 0});
            this.currentPage = 1;
        }
        else {
            var allDeclined: boolean = true;
            this.currentParty.guests.forEach(guest => { if (guest.rsvp) allDeclined = false; });
            if (this.currentParty.email || allDeclined) {
                var alertString: string = "";
                if (this.suggestedSong != "") { 
                    if (!this.suggestedSong.match(/^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.!?&'-]+$/u)) {
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
                    if (!this.userComment.match(/^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.!?&'-]+$/u)) {
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
                if (this.userZipCode != "") {
                    if (!this.userZipCode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)) {
                        alertString += `Invalid zipcode "${this.userZipCode}"!`;
                    }
                    else {
                        var geocoder = new google.maps.Geocoder();

                    geocoder.geocode( { 'address': this.userZipCode }, (results, status) => {
                        if (status == google.maps.GeocoderStatus.OK) {
                            console.log(`${results[0].geometry.location.lat}, ${results[0].geometry.location.lng}`);
                            this.guestService.postPin({
                                access_code: this.currentParty.access_code, 
                                zip: this.userZipCode,
                                lat: results[0].geometry.location.lat(),
                                lng: results[0].geometry.location.lng()
                            }).subscribe(data => {
                                console.log("Posted pin");
                            });
                        } else {
                            alert("Geocode was not successful for the following reason: " + status);
                        }
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
            else {
                alert("Email is required to accept this invitation! Please modify your email by clicking on your party's initials in the top right corner and then try submitting your RSVP again!")
            }
        }
    }

    orderbyValueAsc = (a: KeyValue<string,{party: Party, guests: [Guest?]}>, b: KeyValue<string,{party: Party, guests: [Guest?]}>): number => {
        return a.value.party.party < b.value.party.party ? -1 : (a.value.party.party < b.value.party.party) ? 0 : 1  
    }

    ngOnInit(): void {
    }

}
