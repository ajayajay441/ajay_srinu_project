import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-ebookingpage",
  templateUrl: "./ebookingpage.component.html",
  styleUrls: ["./ebookingpage.component.scss"],
})
export class EbookingpageComponent implements OnInit {
  panelOpenState = false;
  viewShipmentsType = "bookmarked";
  constructor() {}

  ngOnInit(): void {}
}
