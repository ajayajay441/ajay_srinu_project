import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../_services/dashboard.service';
import { Subscription } from 'rxjs/index';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../../_services';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  purchaseType = 'upcoming';
  data = [];
  error: any;
  loading = true;
  subscription: Subscription | undefined;
  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getDashboardPO();
  }

  getDashboardPO(value?: string) {
    let status = '';
    if (value == 'Picked up POs') {
      status = 'PICKED_UP';
    } else if (value == 'Upcoming POs') {
      status = 'UPCOMING';
    } else if (value == 'Action Required') {
      status = 'ACTION_REQUIRED';
    }
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getDashboardPO(userData.Token, status, 2);
        })
      )
      .subscribe((response: any) => {
        this.data = response.PO;
        this.loading = false;
        console.log('PO Response', response.PO);
      });
  }
  onValChange(event:any): any {
    console.log(event);
    alert(event);
  }

}
