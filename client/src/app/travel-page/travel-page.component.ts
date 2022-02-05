import { Component, OnInit } from '@angular/core';
import { CurrentParty } from '../currentParty';

@Component({
  selector: 'app-travel-page',
  templateUrl: './travel-page.component.html',
  styleUrls: ['./travel-page.component.css']
})
export class TravelPageComponent implements OnInit {

  currentParty: CurrentParty;

  constructor(currentParty: CurrentParty) { 
    this.currentParty = currentParty;
  }

  ngOnInit(): void {
  }

}
