import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ShipmentService } from "../_services/shipments.service";
import { Subscription } from "rxjs/index";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../_services";
import { DashboardService } from "../_services/dashboard.service";
const cargoContainerType = [
  {
    label: "type",
    name: "Type",
    options: ["Box", "Bundle"],
    selectedValue: null,
  },
  {
    label: "noOfPieces",
    name: "Type",
    options: ["1", "2", "3"],
    selectedValue: null,
  },
  {
    label: "width",
    name: "Width",
    selectedValue: null,
  },
  {
    label: "height",
    name: "Height",
    selectedValue: null,
  },
  {
    label: "length",
    name: "Length",
    selectedValue: null,
  },
  {
    label: "weight",
    name: "Weight",
    selectedValue: null,
  },
];
@Component({
  selector: "app-ebookingpage",
  templateUrl: "./ebookingpage.component.html",
  styleUrls: ["./ebookingpage.component.scss"],
})
export class EbookingpageComponent implements OnInit {
  myControl = new FormControl();
  // shipper: any;
  checked = false;
  panelOpenState = false;
  ebooking: any = {};
  sendto: string = "Shipper";
  originDataList: any;
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
  cargoContainerTypes = [cargoContainerType];
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

  constructor(
    private router: Router,
    private http: HttpClient,
    private shipmentService: ShipmentService,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {}
  getalueAndServicesSelectedValues() {
    console.log("ebooking", this.ebooking);
  }
  getShipmentOptions() {
    const result: any = {};
    this.shipmentOptions.forEach((x) => (result[x.label] = x.selectedValue));
    console.log("ebooking", result);
  }
  callApi(val: any) {
    this.ebooking.shipper = val;
    if (val.length >= 6) {
      this.authenticationService
        .refreshToken()
        .pipe(
          switchMap((userData) => {
            return this.shipmentService.getebooking_shipper(
              userData.Token,
              this.ebooking.shipper
            );
          })
        )
        .subscribe((response: any) => {
          this.originDataList = response.shipperlist;
          console.log("origin response", response);
        });
    } else if (!val.length) {
      this.originDataList = [];
    }
  }
  addCargotype() {
    this.cargoContainerTypes.push([
      {
        label: "type",
        name: "Type",
        options: ["Box", "Bundle"],
        selectedValue: null,
      },
      {
        label: "noOfPieces",
        name: "Type",
        options: ["1", "2", "3"],
        selectedValue: null,
      },
      {
        label: "width",
        name: "Width",
        selectedValue: null,
      },
      {
        label: "height",
        name: "Height",
        selectedValue: null,
      },
      {
        label: "length",
        name: "Length",
        selectedValue: null,
      },
      {
        label: "weight",
        name: "Weight",
        selectedValue: null,
      },
    ]);
  }
  removeCargoType() {
    this.cargoContainerTypes.pop();
  }
  getCargoContainerTypeData() {
    // this.cargoContainerTypes.forEach()
    this.shipmentOptions.forEach(
      (x) => (this.ebooking[x.label] = x.selectedValue)
    );
    console.log(this.ebooking);
    const result: any = [];
    this.cargoContainerTypes.forEach((type, i) => {
      result[i] = {};
      type.forEach((field) => (result[i][field.label] = field.selectedValue));
    });
    console.log("result", result);
  }
}
