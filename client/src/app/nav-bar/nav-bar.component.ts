import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() title!: String;
  menuShowing: boolean;

  constructor() {
    this.menuShowing = false;
  }

  toggleMenu() {
    this.menuShowing = !this.menuShowing;
  }

  ngOnInit(): void {
  }

}
