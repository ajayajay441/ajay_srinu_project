import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-addsku",
  templateUrl: "./addsku.component.html",
  styleUrls: ["./addsku.component.scss"],
})
export class AddskuComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddskuComponent>) {}
  addSku: any = {};
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
  onAddSku() {
    console.log("The data of ");
  }
}
