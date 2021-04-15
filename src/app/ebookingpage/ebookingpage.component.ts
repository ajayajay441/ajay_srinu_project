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
import { toShortFormat } from "./../utilities";

const cargoContainerType = [
  {
    label: "Type",
    name: "Type",
    options: [
      "Box(S)",
      "Bundle(S)",
      "Carton(S)",
      "Case(S)",
      "Container(S)",
      "Crate(S)",
      "Package(S)",
      "Pallet(S)",
      "Piece(S)",
    ],
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
  cargoIndex = [];
  checked = false;
  panelOpenState = false;
  ebooking: any = {};
  sendto: string = "Shipper";
  originDataList: any;
  destinationDataList: any;
  shipperNameList: any;
  sailingData: any;
  shipperDataList: any;
  valueService: any = [
    {
      name: "sHazardous",
      label: "Is your cargo hazardous?",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    {
      name: "sStackable",
      label: "Is your cargo stackable?",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    {
      name: "sCargoreqinsur",
      label: "Does your cargo require insurance?",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    {
      name: "sOrginclearancereqd",
      label: "Origin clearance required?",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
  ];
  cargoContainerTypes = [cargoContainerType];
  shipmentOptions = [
    {
      label: "sMode",
      name: "Freight Methods",
      options: ["LCL", "FCL", "Air", "Road"],
      selectedValue: "",
    },
    {
      label: "sExportImport",
      name: "Import/Export",
      options: ["Import", "Export"],
      selectedValue: "",
    },
    // {
    //   label: "sTosName",
    //   name: "Incoterms",
    //   options: ["FOB", "EXW", "Others"],
    //   selectedValue: "",
    // },
  ];

  viewShipmentsType = "LCL";
  poData: any;
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
    this.poData = this.router.getCurrentNavigation()?.extras.state;
    console.log(
      "route data collected as state",
      this.router.getCurrentNavigation()?.extras.state
    );
  }
  onOriginDataListSelect(originData: any) {
    this.ebooking.sPOL = originData.port_code;
    this.scheduleApiCallMethod();
  }
  onDestinationDataListSelect(destinationData: any) {
    this.ebooking.sFDC = destinationData.port_code;
    this.scheduleApiCallMethod();
  }
  onShipperDataListSelect(shipperData: any) {
    this.ebooking.sShipperCode = shipperData.code;
    this.ebooking.sShipperAddr = shipperData.address;
  }
  onConsigneeDataListSelect(consigneeData: any) {
    this.ebooking.sConsigneeCode = consigneeData.code;
    this.ebooking.sConsigAddr = consigneeData.address;
  }
  onNotifyDataListSelect(notifyData: any) {
    this.ebooking.sNotifyCode1 = notifyData.code;
    this.ebooking.sFirstNotifyAddr = notifyData.address;
  }
  scheduleApiCallMethod() {
    this.shipmentOptions.forEach(
      (x) => (this.ebooking[x.label] = x.selectedValue)
    );
    if (this.ebooking.sMode === "LCL" || this.ebooking.sMode === "FCL") {
      this.ebooking.sSeaAir = "SEA";
    } else if (this.ebooking.sMode === "Air") {
      this.ebooking.sSeaAir = "AIR";
    }
    console.log(
      this.ebooking.sMode,
      this.ebooking.sExportImport,
      this.ebooking.sPOL_Name
    );
    if (
      this.ebooking.sMode &&
      this.ebooking.sFDC_Name &&
      this.ebooking.sPOL_Name
    ) {
      console.log("calling API");
      this.authenticationService
        .refreshToken()
        .pipe(
          switchMap((userData) => {
            return this.ebookingService.getSailingSchedule(
              userData.Token,
              "",
              "",
              this.ebooking.sMode,
              this.ebooking.sPOL,
              this.ebooking.sFDC
            );
          })
        )
        .subscribe((response: any) => {
          // this.data = response.Shipments;
          console.log("Schedule API ", response);
          this.sailingData = response;
        });
    }
  }
  ngOnInit(): void {}
  getalueAndServicesSelectedValues() {
    // console.log("ebooking", this.ebooking);
  }
  // getebooking_port
  originPortList: any;
  destinationPortList: any;

  getOriginport(val: any) {
    this.ebooking.sPOL = val;
    if (val.length > 4) {
      if (!this.ebooking.sSeaAir) {
        alert("please select' Freight Methods'");
        return;
      }
    }
    if (val.length >= 4) {
      this.authenticationService
        .refreshToken()
        .pipe(
          switchMap((userData) => {
            return this.ebookingService.getport(
              userData.Token,
              this.ebooking.sPOL,
              this.ebooking.sSeaAir
            );
          })
        )
        .subscribe((response: any) => {
          this.originDataList = response.portmaster;
          console.log("origin response", response);
        });
    } else if (!val.length) {
      this.originDataList = [];
    }
  }

  //Destination port
  getDestinationport(val: any) {
    // this.ebooking.sFDC_Name = val;
    if (val.length == 3) {
      if (!this.ebooking.sSeaAir) {
        alert("please select' Freight Methods'");
        return;
      }
    }
    if (val.length >= 4) {
      this.authenticationService
        .refreshToken()
        .pipe(
          switchMap((userData) => {
            return this.ebookingService.getport(
              userData.Token,
              val,
              this.ebooking.sSeaAir
            );
          })
        )
        .subscribe((response: any) => {
          this.destinationDataList = response.portmaster;
          console.log("origin response", response.portmaster);
        });
    } else if (!val.length) {
      this.destinationDataList = [];
    }
  }

  //
  getShipperName(val: any) {
    if (val.length >= 6) {
      this.authenticationService
        .refreshToken()
        .pipe(
          switchMap((userData) => {
            return this.ebookingService.getebooking_shipper(
              userData.Token,
              val
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
  //getebooking_consignee
  consigneeNameList: any;
  getConsigneeName(val: any) {
    if (val.length >= 6) {
      this.authenticationService
        .refreshToken()
        .pipe(
          switchMap((userData) => {
            return this.ebookingService.getebooking_consignee(
              userData.Token,
              val
            );
          })
        )
        .subscribe((response: any) => {
          this.consigneeNameList = response.consigeelist;
          // console.log("origin response", response);
        });
    } else if (!val.length) {
      this.consigneeNameList = [];
    }
  }
  //notify
  notifyNameList: any;
  getNotifyName(val: any) {
    if (val.length >= 6) {
      this.authenticationService
        .refreshToken()
        .pipe(
          switchMap((userData) => {
            return this.ebookingService.getebooking_consignee(
              userData.Token,
              val
            );
          })
        )
        .subscribe((response: any) => {
          this.notifyNameList = response.consigeelist;
          // console.log("origin response", response);
        });
    } else if (!val.length) {
      this.notifyNameList = [];
    }
  }

  addCargotype() {
    // this.cargoContainers.push(1);
    this.cargoContainerTypes.push([
      {
        label: "Type",
        name: "Type",
        options: [
          "Box(S)",
          "Bundle(S)",
          "Carton(S)",
          "Case(S)",
          "Container(S)",
          "Crate(S)",
          "Package(S)",
          "Pallet(S)",
          "Piece(S)",
        ],
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
    // this.cargoContainers.pop();
    this.cargoContainerTypes.pop();
  }
  createEbooking() {
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData: any) => {
          return this.ebookingService.createEbooking(this.ebooking);
        })
      )
      .subscribe((response: any) => {
        // console.log("E booking", response);
        // this.data = response.Request_Quote_link;
        alert(response.ebooking);
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
    this.ebooking.sToscode = "EXW";
    this.ebooking.sPOD = this.ebooking.sPOL;
    this.ebooking.sPOD_Name = this.ebooking.sPOL_Name;
    this.ebooking.sOrigin = this.ebooking.sPOL;
    this.ebooking.sOriginName = this.ebooking.sPOL_Name;
    this.ebooking.sDestination = this.ebooking.sFDC;
    this.ebooking.sDestName = this.ebooking.sFDC_Name;
    this.ebooking.sScheduleUID = "";
    this.ebooking.sFreight = "Prepaid";
    this.ebooking.sMarksNos = "";
    this.ebooking.sUNNo = "";
    this.ebooking.sIsDoordelivery = "No";
    this.ebooking.sCommodityDesc = "";
    this.ebooking.sSpecialDesc = "";
    this.ebooking.sCustomerOrder = "12345";
    this.ebooking.sProceed = "";
    this.ebooking.sItemNo = "";
    this.ebooking.sOrderedPcs = "";
    // this.ebooking.sFilename = "";
    //date format
    this.ebooking.sCargoReadyDate = this.ebooking.sCargoReadyDate
      ? toShortFormat(this.ebooking.sCargoReadyDate)
      : "";
    this.ebooking.sDlycargordydate = this.ebooking.sDlycargordydate
      ? toShortFormat(this.ebooking.sDlycargordydate)
      : "";
    this.createEbooking();
  }
  // this.localStorageService.getItem("jwtToken")
}
