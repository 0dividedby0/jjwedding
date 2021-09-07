import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StoryPageComponent } from './story-page/story-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WeddingPageComponent } from './wedding-page/wedding-page.component';
import { RsvpPageComponent } from './rsvp-page/rsvp-page.component';
import { TravelPageComponent } from './travel-page/travel-page.component';
import { RegistryPageComponent } from './registry-page/registry-page.component';
import { LoginComponent } from './login/login.component';
import { CurrentParty } from './currentParty';
import { CountdownComponent } from './countdown/countdown.component';
import { CommunityPageComponent } from './community-page/community-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StoryPageComponent,
    NavBarComponent,
    WeddingPageComponent,
    RsvpPageComponent,
    TravelPageComponent,
    RegistryPageComponent,
    LoginComponent,
    CountdownComponent,
    CommunityPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CurrentParty],
  bootstrap: [AppComponent]
})
export class AppModule { }
