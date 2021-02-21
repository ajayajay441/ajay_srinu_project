import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {
  shipmentType = 'booked';
  transitStatusSteps = [
    'Cargo received',
    'In transit',
    'Actual departed',
    'ETA delayed',
    'Delivered'
  ];
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
  ) {
    this.matIconRegistry.addSvgIcon(
      "fresconflight",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/fresconflight.svg")
    );
  }

  ngOnInit(): void {
  }

  goTo(routePageName: string, data: any) {
    console.log('data', data)
    this.router.navigate([`${routePageName}`]); // navigate to other page
  }

}
