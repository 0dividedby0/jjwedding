import { Component, OnInit } from '@angular/core';
import { GuestService } from '../guest.service';
import { CurrentParty } from '../currentParty';
import {} from 'googlemaps';

interface Comment {
  author: string;
  message: string;
  time: string;
  system_message: boolean;
  id: number;
}
interface Pin {
  access_code: string;
  zip: string;
  lat: number;
  lng: number
}

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css']
})
export class CommunityPageComponent implements OnInit {

  currentParty: CurrentParty;
  suggestedSong: string;
  userComment: string;
  userZipCode: string;
  map?: google.maps.Map;
  pins: [google.maps.Marker?] = [];
  center = { lat: 39.5, lng: -97.5 };
  comments: [Comment?] = [];

  constructor(private guestService: GuestService, currentParty: CurrentParty) {
    this.currentParty = currentParty;
    this.suggestedSong = "";
    this.userComment = "";
    this.userZipCode = "";
  }

  getPins() {
    this.guestService.getAllPins().subscribe((data: [Pin]) => {
      this.pins.forEach(pin => {
        pin!.setMap(null);
      });
      this.pins = [];
      data.forEach(pin => {
        this.pins.push(new google.maps.Marker({ position: {lat: pin.lat, lng: pin.lng}, map: this.map }))
      });
    });
  }

  initMap() {
    this.map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 4,
        center: this.center,
      }
    );
    this.getPins();
  }

  addPin() {
    if (this.userZipCode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)) {
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
            this.getPins();
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
    else {
      alert(`Invalid zipcode "${this.userZipCode}"!`);
    }
  }

  getComments() {
    this.guestService.getAllComments().subscribe((data: [Comment]) => {
      this.comments = data;
      console.log(this.comments);
    });
  }

  suggestSong() {
    if (this.suggestedSong.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.!?&'-]+$/u)) {
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
        this.getComments();
      });
      this.suggestedSong = "";
    }
    else {
      alert(`Invalid song name "${this.suggestedSong}"!\n- No special characters (&,#,@,etc.)\n`);
    }
  }

  submitComment() {
    if (this.userComment.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.!?&'-]+$/u)) {
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
        this.getComments();
      });
      this.userComment = "";
    }
    else {
      alert(`Invalid comment "${this.userComment}"!\n- No special characters (*,#,@,etc.)\n`);
    }
  }

  deleteComment(id: number) {
    this.guestService.deleteComment(id).subscribe(data => {
      console.log("Deleted comment");
      this.getComments();
    });
  }

  ngOnInit(): void {
    let instagramScript = document.createElement('script');
    instagramScript.async = true;
    instagramScript.src = 'https://cdn.curator.io/published/96f1597c-9708-41da-be09-7253bffe4ed4.js';
    document.getElementById('instagram')!.appendChild(instagramScript);

    this.initMap();
    this.getComments();
  }

}
