import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipmentactivity',
  templateUrl: './shipmentactivity.component.html',
  styleUrls: ['./shipmentactivity.component.scss']
})
export class ShipmentactivityComponent implements OnInit {

  @Input() shipment: any;
  viewedby: string = '3 Parties';
  sendto: string = 'Shipper';
  emptyParty: Party = { name: 'New party 1', email: '', phone: '' };
  sendMessageToParties: Party[] = [
    this.emptyParty
  ];
  inEditMode: boolean = false;
  sendMessageViaOptions: string[] = ['email', 'phone'];

  constructor() { }

  ngOnInit(): void {
    console.log('shipment', this.shipment);
  }

  addAnotherParty() {
    this.sendMessageToParties.push(this.emptyParty);
    console.log('this.sendMessageToParties', this.sendMessageToParties);
  }

}

interface Party {
  name: string,
  email?: string,
  phone?: string,
  sendToOption?: string
}
