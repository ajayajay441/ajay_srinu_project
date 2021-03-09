import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargodetails',
  templateUrl: './cargodetails.component.html',
  styleUrls: ['./cargodetails.component.scss']
})
export class CargodetailsComponent implements OnInit {

  cargoDetails: any = [
    { label: 'Number of Pieces', value: 3 },
    { label: 'Commodity', value: 'POLYSTER TAPE40002082POLYSTER TAPE 41000042' },
    { label: 'Gross Weight', value: '885 kg.' },
    { label: 'Volume', value: 0 },
    { label: 'Shipper Invoice', value: 299388004 },
    { label: 'POL', value: 'Shangai, China' },
    { label: 'POD', value: 'Nhava Sheva (JPNT)' },
    { label: 'Express Origina', value: 'Express BL' },
    { label: 'Container No', value: 7 },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
