import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipmentspage',
  templateUrl: './shipmentspage.component.html',
  styleUrls: ['./shipmentspage.component.scss']
})
export class ShipmentspageComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goTo(routePageName: string) {
    this.router.navigate([`${routePageName}`]); // navigate to other page
  }
}
