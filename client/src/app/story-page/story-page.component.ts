import { Component, OnInit } from '@angular/core';

interface timelineItem {
  title: string,
  date: string;
  caption: string;
  image: string;
}

@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.css']
})
export class StoryPageComponent implements OnInit {

  timelineItems: timelineItem[];

  constructor() { 
    this.timelineItems = [
      {
        title: "First Sight!",
        date: "June 3, 2018",
        caption: "Jason and Jessica meet at a roller skating rink/bowling alley in Seattle kicking off one of the most busy,\
         fun, and romantic tales you've ever heard.",
        image: "meeting.jpeg"
      },{
        title: "The Beginning!",
        date: "July 3, 2018",
        caption: "Jessica picks up Jason to shop for fireworks but they end up talking the night away while watching an\
         impromptu firwork show at Muckleshoot Casino. Both mark this day as the beginning of their relationship.",
        image: "fireworks.jpeg"
      },{
        title: "First Date!",
        date: "July 17, 2018",
        caption: "Jason and Jessica had been hanging out a lot for about 2 weeks but had not been on a proper date yet.\
         Jason wanted to make it one she would never forget with surprise jet skiing, dinner, and a ride on Seattle's\
         Great Wheel!",
        image: "firstDate.jpeg"
      },{
        title: "Second Date!",
        date: "July 24, 2018",
        caption: "Not to be outdone, Jessica planned the second 'official date' with surprise go-kart racing, and chocolate\
         strawberries for sunset at one of Seattle's most picturesque spots, Kerry Park.",
        image: "secondDate.jpeg"
      },{
        title: "Family and Distance",
        date: "August 4, 2018",
        caption: "Summer had come to an end with Jason's mom and sister coming to help him move back to Pullman. Jason and Jessica\
         were not sure at first that they wanted to do long distance but that soon changed when they found it was just too hard to be\
         apart. Thus began 3 years of long distance but they were determined to be together!",
        image: "goodbye.jpeg"
      },{
        title: "Pullman Surprise!",
        date: "August 31, 2018",
        caption: "A pivotal moment in their relationship, after the first month of long distance Jessica plans a surprise visit\
         to Pullman, Jason's college town, for his birthday. She coordinated with Chase (the best man) and was prepared with fake photos\
         to text Jason throughout the day, throwing him off the trail. This was easily the most surprised Jason has ever been!",
        image: "wsu.jpeg"
      },{
        title: "San Fran Birthday!",
        date: "November 10, 2018",
        caption: "Jason met Jessica in San Fransisco for her birthday! They went ice skating, joined a flash mob, took a pedal boat,\
         went on a twilight dinner cruise, ate at a fancy restaurant, saw a parade, went to a warship museum, watched the seals,\
         and biked across the Golden Gate Bridge. This is still one of their favorite trips they took together!",
        image: "sanfran.jpeg"
      },{
        title: "Jason's Family!",
        date: "December 23, 2018",
        caption: "First time Jessica met the whole Halcomb family! She fit right in and we all had a great time in Boise bowling,\
         fishing, skiing, cooking dinner, and putting up Christmas lights. She also got to go to church with us all and meet several\
         of Jason's friends!",
        image: "halcombs.jpeg"
      },{
        title: "Jessica's Family!",
        date: "January 1, 2019",
        caption: "First time Jason met Jessica's family! Jessica had prepared Jason for some intense questioning so he was a bit nervous,\
         but they were all so, so welcoming! They went hiking and 4 wheeling, wandered around Zoo Lights, and partied it up for new years\
         where Jason got to meet a bunch of Jessica's wonderful friends. They wrapped up the visit with a romantic trip to Sedona!",
        image: "peebles.jpeg"
      },{
        title: "Mexico!",
        date: "March 9, 2019",
        caption: "This was Jessica and Jason's first international trip together! Spring break in Rocky Point, Mexico\
         did not disappoint with gorgeous beaches, fun clubs, great food, and phenomenal friends!",
        image: "mexico.jpeg"
      },{
        title: "Jason's Graduation",
        date: "May 4, 2019",
        caption: "Jason graduated from the Washington State University Honors College with a BS in Computer Engineering, and minors\
         in Computer Science, Electrical Engineering, and Math. He then got a job with Boeing and moved to Seattle!",
        image: "jasonGraduation.jpeg"
      },{
        title: "1st Anniversary!",
        date: "July 3, 2019",
        caption: "Back to where it all began! Jessica came up to Seattle and they went roller skating at the place where they\
         first met, watched fireworks, hiked a couple mountains, went to a baseball game, and just celebrated being together for\
         a whole year!",
        image: "firstAnniversary.jpeg"
      },{
        title: "Halloween Surprise!",
        date: "October 31, 2019",
        caption: "Jason was finally able to surprise Jessica with a visit to Tucson for Halloween! They dressed up as a Mermaid and her\
         prince, going to the pumpkin patch and Arizona's homecoming celebrations. Jason even got some proposal practice in 😉.",
        image: "halloweenSurprise.jpeg"
      },{
        title: "Hawaii!",
        date: "March 14, 2019",
        caption: "Jason and Jessica spontaneously decided it had been too long since they had seen each other in person and booked\
         a flight to Hawaii just 6 hours before it departed. The whole trip ended up working out great with some spectacular beaches,\
         kayaking, waterfals, hiking, rain, and some amazing company!",
        image: "hawaii.jpeg"
      },{
        title: "Seattle Summer!",
        date: "May 23, 2019",
        caption: "After completing her Bachelors, Jessica moved up to Seattle for an internship with Boeing! This meant that Jason and\
        Jessica got to experience a taste of what the end of long distance would feel like. It was a bit of an adjustment but\
        also just so much fun, a window into what life would look like together!",
        image: "seattleSummer.jpeg"
      },{
        title: "2nd Anniversary!",
        date: "July 3, 2020",
        caption: "Once again keeping the traditions alive with fireworks, Nibbana Thai Food, and jet skiing, although with a little\
         bit better camera angle this time! Jason also took Jessica to the flower fields for a bouquet since Pike Place was closed.",
        image: "secondAnniversary.jpeg"
      },{
        title: "Boise Christmas!",
        date: "December 25, 2020",
        caption: "Jason and Jessica spent their second Christmas in Boise, and the Halcombs even made Jessica a stocking to welcome\
         her in! It was a fun time with family, showing Jessica some of the Christmas traditions like ",
        image: "halcombChristmas.jpeg"
      },{
        title: "Jessica's Graduation",
        date: "May 15, 2021",
        caption: "Jessica graduated from the University of Arizona with a Masters degree in Chemical Engineering! She had many\
         offers but ultimately decided to accept a position with Boeing as a Materials, Process, and Physics Engineer in Seattle,\
         WA.",
        image: "jessicaGraduation.jpeg"
      },{
        title: "Seattle Move!",
        date: "May 22, 2021",
        caption: "Just a week after graduation, Jessica and her mom road tripped all the way up from Phoenix to Washington, making several\
         fun stops along the way. Once in Seattle, she and Jason signed the lease for their new downtown apartment and, with some awesome\
         help from friends, moved in together. This officially marked the end of 3 years of long distance!",
        image: "newApartment.jpeg"
      },{
        title: "The Proposal!",
        date: "June 12, 2021",
        caption: "Jessica thought she was just going out to dinner with a long-time friend, Jessica Jiang, but Jason surprised her with\
         a proposal at the same park as their first date. After she said yes, they both took an aerial seaplane tour of the Olympics,\
         Hurricane Ridge, and their new downtown home! Finally was a fancy dinner and calls to all of their family and friends.",
        image: "engagement.jpeg"
      },{
        title: "South America!",
        date: "June 14, 2021",
        caption: "As a celebration of Jessica's graduation, the end of long distance, and their recent engagement, Jason and Jessica\
         took a 3 week vacation to Galapagos and Peru! Highlights included diving with hammerheads, swimming with sealions, and\
         hiking Machu Picchu!",
        image: "southAmerica.jpeg"
      },{
        title: "3rd Anniversary!",
        date: "July 3, 2021",
        caption: "The day after their return from South America, Jason and Jessica celebrated their 3rd anniversary, this time as an\
         engaged couple! Once again, per tradition, they celebrated the occasion with an all night firework show at Muckleshoot Casino,\
         and Nibbana Thai food at the landing!",
        image: "thirdAnniversary.jpeg"
      },{
        title: "The Wedding!",
        date: "July 2, 2022",
        caption: "Jason and Jessica will be getting married at Empress Estate in Woodland, WA on their 4th anniversary next year. They\
         look forward to celebrating their relationship and commitment to each other with all of you!",
        image: "wedding.jpeg"
      },
    ]
  }

  ngOnInit(): void {
  }

}
