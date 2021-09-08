import { Component, OnInit } from '@angular/core';
import { CurrentParty } from '../currentParty';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css']
})
export class CommunityPageComponent implements OnInit {

  currentParty: CurrentParty;

  constructor(currentParty: CurrentParty) {
    this.currentParty = currentParty;
  }

  ngOnInit(): void {
    let instagramScript = document.createElement('script');
    instagramScript.async = true;
    instagramScript.src = 'https://cdn.curator.io/published/96f1597c-9708-41da-be09-7253bffe4ed4.js';
    document.getElementById('instagram')!.appendChild(instagramScript);
  }

}
