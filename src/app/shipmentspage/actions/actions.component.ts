import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-actions",
  templateUrl: "./actions.component.html",
  styleUrls: ["./actions.component.scss"],
})
export class ActionsComponent implements OnInit {
  @Input() updates: any;
  updatesData: any;
  constructor() {}

  ngOnInit(): void {
    this.updatesData = this.updates;
    // console.log("updates", this.updatesData);
  }
}
