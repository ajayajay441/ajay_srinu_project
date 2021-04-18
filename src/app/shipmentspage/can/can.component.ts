import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-can",
  templateUrl: "./can.component.html",
  styleUrls: ["./can.component.scss"],
})
export class CANComponent implements OnInit {
  @Input() CAN: any;
  CANData: any;
  constructor() {}

  ngOnInit(): void {
    this.CANData = this.CAN;
    // console.log("CAN", this.CAN);
  }
}
