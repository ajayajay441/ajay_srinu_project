import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"],
})
export class DocumentsComponent implements OnInit {
  @Input() documents: any;
  documentsTabData: any;
  constructor() {}

  ngOnInit(): void {
    this.documentsTabData = this.documents;
    // console.log("documents", this.documentsTabData);
  }
}
