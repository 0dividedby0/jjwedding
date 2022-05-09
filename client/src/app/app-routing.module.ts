import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { StoryPageComponent } from './story-page/story-page.component';
import { WeddingPageComponent } from './wedding-page/wedding-page.component';
import { RsvpPageComponent } from './rsvp-page/rsvp-page.component';
import { TravelPageComponent } from './travel-page/travel-page.component';
import { RegistryPageComponent } from './registry-page/registry-page.component';
import { CommunityPageComponent } from './community-page/community-page.component';
import { BridalPageComponent } from './bridal-page/bridal-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'story', component: StoryPageComponent },
  { path: 'wedding', component: WeddingPageComponent },
  { path: 'rsvp', component: RsvpPageComponent },
  { path: 'travel', component: TravelPageComponent },
  { path: 'registry', component: RegistryPageComponent },
  { path: 'community', component: CommunityPageComponent },
  { path: 'bridalshower', component: BridalPageComponent },
  { path: 'faq', component: FaqPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
