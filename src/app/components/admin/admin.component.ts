import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  currentList: any[] = [];

  showLogo: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event)=>{
      if(event instanceof NavigationEnd){
        this.showLogo = event.urlAfterRedirects === '/admin';
      }
    })
  }
}
