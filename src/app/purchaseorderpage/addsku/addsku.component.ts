import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { POservice } from "../../_services/po.service";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../../_services";
import { LocalStorageService } from "../../_services/local-storage.service";
import { toShortFormat } from "../../utilities";

@Component({
  selector: "app-addsku",
  templateUrl: "./addsku.component.html",
  styleUrls: ["./addsku.component.scss"],
})
export class AddskuComponent implements OnInit {
  constructor(
      public dialogRef: MatDialogRef<AddskuComponent>,
      private poService: POservice,
      private authenticationService: AuthenticationService,
      private localStorageService: LocalStorageService,
) {}

  addSku: any =   {
    itemname: '',
    Itemdesc: '',
    Pckgtype: '',
    Pieces: '',
    cargo_ready_date: '',
    delivery_date: '',
    sauth_token: ''
  };
  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  onAddSku(): void {
    this.addSku.cargo_ready_date = this.addSku.cargo_ready_date
        ? toShortFormat(this.addSku.cargo_ready_date)
        : "";
    this.addSku.delivery_date = this.addSku.delivery_date
        ? toShortFormat(this.addSku.delivery_date)
        : "";
    this.addSku.user_token = this.localStorageService.getItem("jwtToken");
    this.authenticationService
        .refreshToken()
        .pipe(
            switchMap((userData) => {
              return this.poService.addSku(
                  this.addSku,
                  userData.Token
              );
            })
        )
        .subscribe((response: any) => {
          // console.log("E booking", response);
          // this.data = response.Request_Quote_link;
          alert(response);
        });
    this.dialogRef.close();
  }




}
