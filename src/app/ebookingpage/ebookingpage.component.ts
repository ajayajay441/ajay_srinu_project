import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ShipmentService } from "../_services/shipments.service";
import { Subscription } from "rxjs/index";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../_services";
import { EbookingService } from "../_services/ebooking.service";
import { LocalStorageService } from "../_services/local-storage.service";

const cargoContainerType = [
  {
    label: "Type",
    name: "Type",
    options: ["Box", "Bundle"],
    selectedValue: null,
  },
  {
    label: "No ofPieces",
    name: "NoofPieces",
    options: ["1", "2", "3"],
    selectedValue: null,
  },
  {
    label: "Width",
    name: "Width",
    selectedValue: null,
  },
  {
    label: "Height",
    name: "Height",
    selectedValue: null,
  },
  {
    label: "Length",
    name: "Length",
    selectedValue: null,
  },
  {
    label: "GrossWeight",
    name: "GrossWeight",
    selectedValue: null,
  },
];
@Component({
  selector: "app-ebookingpage",
  templateUrl: "./ebookingpage.component.html",
  styleUrls: ["./ebookingpage.component.scss"],
})
export class EbookingpageComponent implements OnInit {
  // shipper: any;
  checked = false;
  panelOpenState = false;
  ebooking: any = {};
  sendto: string = "Shipper";
  originDataList: any;
  shipperNameList: any;
  valueService: any = [
    {
      name: "sHazardous",
      label: "Is your cargo hazardous?",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "sStackable",
      label: "Is your cargo stackable?",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "sCargoreqinsur",
      label: "Does your cargo require insurance?",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "sOrginclearancereqd",
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
      label: "sMode",
      name: "Select Freight Methods",
      options: ["LCL", "FCL", "Air", "Road"],
      selectedValue: "LCL",
    },
    {
      label: "sExportImport",
      name: "Import/Export",
      options: ["Import", "Export"],
      selectedValue: "Import",
    },
    {
      label: "sTosName",
      name: "Incoterms",
      options: ["FOB", "EXW", "Others"],
      selectedValue: "",
    },
  ];

  viewShipmentsType = "LCL";

  constructor(
    private router: Router,
    private http: HttpClient,
    private shipmentService: ShipmentService,
    private authenticationService: AuthenticationService,
    private ebookingService: EbookingService,
    private localStorageService: LocalStorageService,
    private activatedroute: ActivatedRoute
  ) {
    // console.log("eBooking route data", this.router);
    // console.log(
    //   "route data collected as state",
    //   this.router.getCurrentNavigation()?.extras.state
    // );
  }

  ngOnInit(): void {}
  getalueAndServicesSelectedValues() {
    // console.log("ebooking", this.ebooking);
  }
  // getShipmentOptions() {
  //   const result: any = {};
  //   this.shipmentOptions.forEach(
  //     (x) => (this.ebooking[x.label] = x.selectedValue)
  //   );
  //   // console.log("ebooking", result);
  // }
  getShipperName(val: any) {
    this.ebooking.sShipperName = val;
    if (val.length >= 6) {
      this.authenticationService
        .refreshToken()
        .pipe(
          switchMap((userData) => {
            return this.ebookingService.getebooking_shipper(
              userData.Token,
              this.ebooking.sShipperName
            );
          })
        )
        .subscribe((response: any) => {
          this.shipperNameList = response.shipperlist;
          // console.log("origin response", response);
        });
    } else if (!val.length) {
      this.shipperNameList = [];
    }
  }
  callApi(val: any) {
    this.ebooking.shipper = val;
    if (val.length >= 6) {
      this.authenticationService
        .refreshToken()
        .pipe(
          switchMap((userData) => {
            return this.ebookingService.getebooking_shipper(
              userData.Token,
              this.ebooking.shipper
            );
          })
        )
        .subscribe((response: any) => {
          this.originDataList = response.shipperlist;
          // console.log("origin response", response);
        });
    } else if (!val.length) {
      this.originDataList = [];
    }
  }
  addCargotype() {
    this.cargoContainerTypes.push([
      {
        label: "Type",
        name: "Type",
        options: ["Box", "Bundle"],
        selectedValue: null,
      },
      {
        label: "NoofPieces",
        name: "NoofPieces",
        options: ["1", "2", "3"],
        selectedValue: null,
      },
      {
        label: "Width",
        name: "Width",
        selectedValue: null,
      },
      {
        label: "Height",
        name: "Height",
        selectedValue: null,
      },
      {
        label: "Length",
        name: "Length",
        selectedValue: null,
      },
      {
        label: "GrossWeight",
        name: "GrossWeight",
        selectedValue: null,
      },
    ]);
  }
  removeCargoType() {
    this.cargoContainerTypes.pop();
  }
  createEbooking() {
    // this.data = /,
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData: any) => {
          return this.ebookingService.createEbooking(this.ebooking);
        })
      )
      .subscribe((response: any) => {
        // console.log("ship resp", response);
        // this.data = response.Request_Quote_link;
      });
  }
  getCargoContainerTypeData() {
    // this.cargoContainerTypes.forEach()
    this.shipmentOptions.forEach(
      (x) => (this.ebooking[x.label] = x.selectedValue)
    );
    // console.log(this.ebooking);
    const lcontainer: any = [];
    this.cargoContainerTypes.forEach((type, i) => {
      lcontainer[i] = {};
      type.forEach(
        (field) => (lcontainer[i][field.label] = field.selectedValue)
      );
    });
    this.ebooking.lcontainer = lcontainer;
    this.ebooking.user_token = this.localStorageService.getItem("jwtToken");
    this.authenticationService.refreshToken();
    this.ebooking.sauth_token = this.localStorageService.getItem(
      "refreshToken"
    );
    // console.log("result", lcontainer);
    this.createEbooking();
  }
  // this.localStorageService.getItem("jwtToken")
}
