import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-ebookingpage",
  templateUrl: "./ebookingpage.component.html",
  styleUrls: ["./ebookingpage.component.scss"],
})
export class EbookingpageComponent implements OnInit {
  checked = false;
  panelOpenState = false;
  ebooking: any = {};
  sendto: string = "Shipper";
  valueService: any = [
    {
      name: "Is your cargo hazardous?",
      label: "Is your cargo hazardous?",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "Is your cargo stackable?",
      label: "Is your cargo stackable?",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "Does your cargo require insurance?",
      label: "Does your cargo require insurance?",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "Origin clearance required?",
      label: "Origin clearance required?",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
  ];

  shipmentOptions = [
    {
      label: "freightMethods",
      name: "Select Freight Methods",
      options: ["LCL", "FCL", "Air", "Road"],
      selectedValue: "LCL",
    },
    {
      label: "importExport",
      name: "Import/Export",
      options: ["Import", "Export"],
      selectedValue: "Import",
    },
    {
      label: "incoterms",
      name: "Incoterms",
      options: ["FOB", "EXW", "Others"],
      selectedValue: "FOB",
    },
  ];

  viewShipmentsType = "LCL";
  constructor() {}

  ngOnInit(): void {}
  getalueAndServicesSelectedValues() {
    console.log("ebooking", this.ebooking);
  }
  getShipmentOptions() {
    const result: any = {};
    this.shipmentOptions.forEach((x) => (result[x.label] = x.selectedValue));
    console.log("ebooking", result);
  }
}
