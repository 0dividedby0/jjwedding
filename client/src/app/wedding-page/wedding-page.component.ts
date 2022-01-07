import { Component, OnInit } from '@angular/core';
import { CurrentParty } from '../currentParty';

@Component({
  selector: 'app-wedding-page',
  templateUrl: './wedding-page.component.html',
  styleUrls: ['./wedding-page.component.css']
})
export class WeddingPageComponent implements OnInit {

  currentParty: CurrentParty;

  constructor(currentParty: CurrentParty) { 
    this.currentParty = currentParty;
  }

  ngOnInit(): void {
  }

}
