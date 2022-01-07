import { Injectable } from '@angular/core';

interface Guest {
    access_code: string;
    name: string;
    rsvp: boolean;
    guest_id: number;
}

@Injectable()
export class CurrentParty {
    access_code: string = '';
    party: string = '';
    email: string = '';
    responded: boolean = false;
    admin: boolean = false;
    bridal_shower: boolean = false;
    authenticated: boolean = false;
    guests: Array<Guest> = [];
}