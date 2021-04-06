import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-cargodetails",
  templateUrl: "./cargodetails.component.html",
  styleUrls: ["./cargodetails.component.scss"],
})
export class CargodetailsComponent implements OnInit {
  @Input() cargo: any;
  cargoDetails: any;
  constructor() {}

  ngOnInit(): void {
    this.cargoDetails = this.cargo;
    // console.log("cargo", this.cargo);
  }
}
