import { Component, OnInit } from '@angular/core';
import { CurrentParty } from '../currentParty';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent implements OnInit {

  currentParty: CurrentParty;

  constructor(currentParty: CurrentParty) { 
    this.currentParty = currentParty;
  }

  ngOnInit(): void {
  }

}
