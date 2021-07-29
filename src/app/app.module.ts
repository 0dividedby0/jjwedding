import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StoryPageComponent } from './story-page/story-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WeddingPageComponent } from './wedding-page/wedding-page.component';
import { RsvpPageComponent } from './rsvp-page/rsvp-page.component';
import { TravelPageComponent } from './travel-page/travel-page.component';
import { RegistryPageComponent } from './registry-page/registry-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StoryPageComponent,
    NavBarComponent,
    WeddingPageComponent,
    RsvpPageComponent,
    TravelPageComponent,
    RegistryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
