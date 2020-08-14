import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bootrap-page',
  templateUrl: './bootrap-page.component.html'
})
export class BootrapPageComponent implements OnInit {
   persons = [
    { first: 'Andy', last: 'Bui', handle: 'AN' },
    { first: 'Angie', last: 'Bächi', handle: 'AB' },
    { first: 'Olivier', last: 'Meylan', handle: 'OL' },
    { first: 'Quentin', last: 'Antenen', handle: 'QU' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
