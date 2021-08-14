import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('fireworkAnimation', [      
      transition(':enter', [
        style({ opacity: 1 }),
        animate(1000)
      ]),
      transition(':leave', [
        animate(1000, style({ opacity: 0 }))
      ]),
      state('*', style({ opacity: 1 })),
    ])
  ]
})
export class HomePageComponent implements OnInit {

  constructor() { }

  title = "Jason & Jessica";
  countdown = "340 days 21 hours 12 minutes"
  fireworksShowing = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.fireworksShowing = false;
    }, 4000);
  }

}
