import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registry-page',
  templateUrl: './registry-page.component.html',
  styleUrls: ['./registry-page.component.css']
})
export class RegistryPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(jqueryScript);

    let registryScript = document.createElement('script');
    registryScript.id = 'script_myregistry_giftlist_iframe'
    registryScript.src = '//www.myregistry.com//Visitors/GiftList/iFrames/EmbedRegistry.ashx?r=Bci0OJSBmuAf2qR21-S_xg2&v=2';
    registryScript.type = 'text/javascript';
    document.getElementById('registryContent')!.appendChild(registryScript);
  }

}
