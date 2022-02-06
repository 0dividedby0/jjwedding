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
    let registryScript = document.createElement('script');
    registryScript.id = 'script_myregistry_giftlist_iframe'
    registryScript.src = '//www.myregistry.com//Visitors/GiftList/iFrames/EmbedRegistry.ashx?r=qQGMRuDK3xi6uF6WFYKp2Q2&v=2';
    registryScript.type = 'text/javascript';
    document.getElementById('registryContent')!.appendChild(registryScript);
  }
}
