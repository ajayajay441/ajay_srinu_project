import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-ebookingpage",
  templateUrl: "./ebookingpage.component.html",
  styleUrls: ["./ebookingpage.component.scss"],
})
export class EbookingpageComponent implements OnInit {
  panelOpenState = false;
  ebooking: any = {};
  sendto: string = "Shipper";
  valueService: any = [
    {
      name: "Aa aa aaa aaaa",
      label: "aaaaaaa",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "Bb bb bbbb bbbbbb",
      label: "bbbbbbbb",
      options: [
        { label: "111111", value: 1 },
        { label: "222222", value: 0 },
      ],
    },
    {
      name: "CCC ccc",
      label: "cccccccc",
      options: [
        { label: "111111", value: 1 },
        { label: "222222", value: 0 },
      ],
    },
    {
      name: "Ddd Ddd",
      label: "ddddddd",
      options: [
        { label: "111111", value: 1 },
        { label: "222222", value: 0 },
      ],
    },
  ];

  shipmentOptions = [
    {
      label: 'freightMethods',
      name: 'Freight Methods',
      options: ['LCL', 'FCL', 'Air', 'Road'],
      selectedValue: 'LCL'
    },
    {
      label: 'importExport',
      name: 'Import/Export',
      options: ['Import', 'Export'],
      selectedValue: 'Import'
    },
    {
      label: 'incoterms',
      name: 'Incoterms',
      options: ['FOB', 'EXW', 'Others'],
      selectedValue: 'FOB'
    },
  ];



  viewShipmentsType = 'LCL';
  constructor() { }

  ngOnInit(): void { }
  getalueAndServicesSelectedValues() {
    console.log("ebooking", this.ebooking);
  }
  getShipmentOptions() {
    const result: any = {};
    this.shipmentOptions.forEach(x => result[x.label] = x.selectedValue);
    console.log("ebooking", result);
  }
}
