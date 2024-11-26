import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/concert.model';
import { ConcertService } from 'src/app/services/concerts/concert.service';

@Component({
  selector: 'app-concert-admin',
  templateUrl: './concert-admin.component.html',
  // styleUrls: ['./concert-admin.component.scss']
})
export class ConcertAdminComponent implements OnInit {

  currentList : Concert[] = [];

  constructor(private concertService: ConcertService) {}

  ngOnInit(): void {
    this.concertService.getConcerts().subscribe((data: any) => {
      this.currentList = Array.isArray(data.Concerts) ? data.Concerts : [];
    });
  }

 /*  deleteConcert(id: string) {
    this.concertService.deleteConcert(id).subscribe(() => {
      this.currentList = this.currentList.filter((concert) => concert._id !== id);
    });
  } */
}
