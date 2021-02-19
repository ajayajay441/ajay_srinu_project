import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

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
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "fresconflight",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/fresconflight.svg")
    );
  }

  ngOnInit(): void {
  }

}
