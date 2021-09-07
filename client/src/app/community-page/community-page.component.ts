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
  }

}
