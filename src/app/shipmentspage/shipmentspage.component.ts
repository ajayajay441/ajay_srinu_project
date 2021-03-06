import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipmentspage',
  templateUrl: './shipmentspage.component.html',
  styleUrls: ['./shipmentspage.component.scss']
})
export class ShipmentspageComponent implements OnInit {
  shipments = [
    { name: 'cargo', seemore: false },
    { name: 'Booked', seemore: false },
  ];
  viewShipmentsType = 'bookmarked';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  toggleShipmentDataView(shipment: any) {
    console.log(shipment, 'card expand or collapse');
  }
}
