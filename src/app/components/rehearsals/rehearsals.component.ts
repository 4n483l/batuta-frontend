import { Component } from '@angular/core';

export interface Rehearsal {
  id: number;
  place: string;
  date: string; // formato: "YYYY-MM-DD"
  hour: string;
}

@Component({
  selector: 'app-rehearsals',
  templateUrl: './rehearsals.component.html',
  styleUrls: ['./rehearsals.component.scss']
})
export class RehearsalsComponent {

}


