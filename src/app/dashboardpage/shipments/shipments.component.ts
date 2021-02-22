import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../_services/dashboard.service';
import { Subscription } from 'rxjs/index';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../../_services';
@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {
  shipmentType = 'booked';
  transitStatusSteps = [
    'Cargo received',
    'In transit',
    'Actual departed',
    'ETA delayed',
    'Delivered'
  ];
  data = [];
  error: any;
  loading = true;
  subscription: Subscription | undefined;
  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
  ) {
    this.matIconRegistry.addSvgIcon(
      "fresconflight",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/fresconflight.svg")
    );
  }

  ngOnInit(): void {
    this.getDashboardShipments();
  }

  goTo(routePageName: string, data: any) {
    console.log('data', data)
    this.router.navigate([`${routePageName}`]); // navigate to other page
  }
  getDashboardShipments(value?: string) {
    let status = '';
    if (value == 'Bookmarked') {
      status = 'BOOKMARK';
    } else if (value == 'Arriving') {
      status = 'ARRIVING';
    } else if (value == 'Booked') {
      status = 'BOOKED';
    }
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getDashboardShipments(
            userData.Token,
            status
          );
        })
      )
      .subscribe((response: any) => {
        this.data = response.Shipments;
        this.loading = false;
        console.log('ship resp', response.Shipments);
      });
  }

}
