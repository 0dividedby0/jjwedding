import { Component, OnInit } from '@angular/core';
import { CurrentParty } from '../currentParty';

@Component({
  selector: 'app-bridal-page',
  templateUrl: './bridal-page.component.html',
  styleUrls: ['./bridal-page.component.css']
})
export class BridalPageComponent implements OnInit {

  currentParty: CurrentParty;

  constructor(currentParty: CurrentParty) { 
    this.currentParty = currentParty;
  }

  ngOnInit(): void {
  }

}
