import { Component, OnInit } from '@angular/core';
import { GuestService } from '../guest.service';
import { CurrentParty } from '../currentParty';

interface Comment {
  author: string;
  message: string;
  time: string;
  system_message: boolean;
  id: number;
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
  comments: [Comment?] = [];

  constructor(private guestService: GuestService, currentParty: CurrentParty) {
    this.currentParty = currentParty;
    this.suggestedSong = "";
    this.userComment = "";
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

    this.getComments();
  }

}
