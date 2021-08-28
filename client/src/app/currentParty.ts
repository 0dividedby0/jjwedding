import { Injectable } from '@angular/core';

@Injectable()
export class CurrentParty {
    access_code: string = '';
    username: string = '';
    email: string = '';
    authenticated: number = 0;
}