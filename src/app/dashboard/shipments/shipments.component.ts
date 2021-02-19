import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {
  shipmentType = 'booked';
  constructor() { }

  ngOnInit(): void {
  }

}
