import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { GuestService } from '../guest.service';
import { CurrentParty } from '../currentParty';
import {} from 'googlemaps';
import { KeyValue } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  selector: 'app-rsvp-page',
  templateUrl: './rsvp-page.component.html',
  styleUrls: ['./rsvp-page.component.css'],
  animations: [
    trigger('fireworkAnimation', [      
      transition(':enter', [
        style({ opacity: 1 }),
        animate(1000)
      ]),
      transition(':leave', [
        animate(1000, style({ opacity: 0 }))
      ]),
      state('*', style({ opacity: 1 })),
    ])
  ]
})
export class RsvpPageComponent implements OnInit {

    currentParty: CurrentParty;
    suggestedSong: string;
    userComment: string; 
    userZipCode: string;
    warningPopupShowing: boolean = false;
    emailRequiredPopupShowing: boolean = false;
    currentPage: number = 1;
    adminData: { [key: string]: {party: Party, guests: [Guest?]} } = {};
    fireworksShowing = false;
    noResponse: string[] = [];
    noResponseDetails: boolean = false;
    tentativeAccept: string[] = [];
    tentativeDetails: boolean = false;
    accepted: string[][] = [[],[],[],[]];
    acceptedDetails: boolean[] = [false, false, false, false];
    declined: string[][] = [[],[],[],[]];
    declinedDetails: boolean[] = [false, false, false, false];

    
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

            if (this.adminData[guest.access_code].party.responded) {
                guest.rsvp ? this.accepted[0].push(guest.name) : this.declined[0].push(guest.name);
                guest.dinner_rsvp ? this.accepted[1].push(guest.name) : this.declined[1].push(guest.name);
                guest.reunion_rsvp ? this.accepted[2].push(guest.name) : this.declined[2].push(guest.name);
                guest.games_rsvp ? this.accepted[3].push(guest.name) : this.declined[3].push(guest.name);
            }
            else {
                if (guest.rsvp) this.tentativeAccept.push(guest.name);
                else this.noResponse.push(guest.name);
            }
        });
    }

    navRSVP(forward: boolean) {
        switch (this.currentPage) {
            case 1: //Wedding RSVP
                if (forward) {
                    var alertString: string = "";
                    var allDeclined: boolean = true;
                    var anyUndefined: boolean = false;
                    this.currentParty.guests.forEach(guest => {
                        if (guest.rsvp === undefined) anyUndefined = true;
                        else if (guest.rsvp) allDeclined = false;
                        else {
                            guest.dinner_rsvp = false;
                            guest.reunion_rsvp = false;
                            guest.games_rsvp = false;
                        }

                        if (guest.name.match(/"\+[0-9]"/g) && guest.rsvp) alertString += `Please provide a name for ${guest.name}!\n`;
                        else if (guest.rsvp && !guest.name.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) alertString += `Please provide a different name for "${guest.name}"!\n- No special characters (&,#,@,etc.)\n`
                    });
                    if (anyUndefined) alert("Plase provide a response for all guests!")
                    else if (alertString.length > 0) alert(alertString);
                    else allDeclined ? this.currentPage = 5 : this.currentPage = 2;
                }
                break;
            case 2: //Dinner RSVP
                if (forward) {
                    var anyUndefined: boolean = false;
                    this.currentParty.guests.forEach(guest => {
                        if (guest.dinner_rsvp === undefined) anyUndefined = true;
                    });
                    anyUndefined ? alert("Please provide a response for all guests!") : this.currentPage = 3;
                } else {
                    this.currentPage = 1;
                    this.currentParty.guests.forEach(guest => {
                        if (!guest.rsvp) {
                            guest.dinner_rsvp = undefined;
                            guest.reunion_rsvp = undefined;
                            guest.games_rsvp = undefined;
                        }
                    });
                }
                break;
            case 3: //Afterparty RSVP
                if (forward) {
                    var allDeclined: boolean = true;
                    var anyUndefined: boolean = false;
                    this.currentParty.guests.forEach(guest => {
                        if (guest.reunion_rsvp === undefined) anyUndefined = true;
                        else if (guest.reunion_rsvp) allDeclined = false;
                        else guest.games_rsvp = false;
                    });
                    if (anyUndefined) alert("Please provide a response for all guests!");
                    else allDeclined ? this.currentPage = 5 : this.currentPage = 4;
                } else this.currentPage = 2;
                break;
            case 4: //Games RSVP
                if (forward) {    
                    var anyUndefined: boolean = false;
                    this.currentParty.guests.forEach(guest => {
                        if (guest.games_rsvp === undefined) anyUndefined = true;
                    });
                    anyUndefined ? alert("Please provide a response for all guests!") : this.currentPage = 5;
                } else this.currentPage = 3;
                break;
            case 5: //Optionals
                if (!forward) {
                    var allDeclined: boolean = true;
                    this.currentParty.guests.forEach(guest => { if (guest.rsvp) allDeclined = false; });
                    if (allDeclined) {
                        this.currentPage = 1;
                        this.currentParty.guests.forEach(guest => {
                            if (!guest.rsvp) {
                                guest.dinner_rsvp = undefined;
                                guest.reunion_rsvp = undefined;
                                guest.games_rsvp = undefined;
                            }
                        });
                    }
                    else {
                        var allDeclined: boolean = true;
                        this.currentParty.guests.forEach(guest => { if (guest.reunion_rsvp) allDeclined = false; });
                        if (allDeclined) {
                            this.currentPage = 3;
                            this.currentParty.guests.forEach(guest => {
                                if (!guest.reunion_rsvp) guest.games_rsvp = undefined;
                            });
                        } else this.currentPage = 4;
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
            if (confirm("Are you sure you want to change your response? This will clear all current responses!")) {
                this.guestService.updateParty({responded: 0});
                this.currentPage = 1;
            }
        }
        else {
            var allDeclined: boolean = true;
            this.currentParty.guests.forEach(guest => { if (guest.rsvp) allDeclined = false; });
            if (this.currentParty.email || allDeclined) {
                if (this.emailRequiredPopupShowing) {
                    this.guestService.updateParty({email: this.currentParty.email});
                    this.guestService.authenticateParty(this.currentParty.access_code);
                    this.emailRequiredPopupShowing = false;
                }
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
                if (!allDeclined) this.fireworksShowing = true;
                setTimeout(() => {
                    this.fireworksShowing = false;
                }, 4000);
            }
            else {
                if (this.emailRequiredPopupShowing) alert("Email is required to accept this invitation! Please provide an email!");
                else this.emailRequiredPopupShowing = true;
            }
        }
    }

    partyFilter(parties: any) {

    }

    guestFilter(guests: any) {

    }

    orderbyValueAsc = (a: KeyValue<string,{party: Party, guests: [Guest?]}>, b: KeyValue<string,{party: Party, guests: [Guest?]}>): number => {
        return a.value.party.party < b.value.party.party ? -1 : (a.value.party.party < b.value.party.party) ? 0 : 1  
    }

    ngOnInit(): void {
    }

}
