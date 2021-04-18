import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "../../environments/environment";
import { AuthenticationService } from "./authentication.service";
import { map } from "rxjs/operators";
import { first } from "rxjs/internal/operators";

@Injectable({ providedIn: "root" })
export class EbookingService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService
  ) {}

  getebooking_shipper(refreshToken?: string, value?: string) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    let url = `${environment.apiUrl}/getebooking_shipper?user_token=${jwtToken}&sauth_token=${refreshToken}&ssearch_key=${value}`;
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        this.authenticationService
          .refreshToken()
          .pipe(first())
          .subscribe({
            next: () => {},
            error: (error) => {},
          });
        return response;
      })
    );
  }
  getebooking_consignee(refreshToken?: string, value?: string) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    let url = `${environment.apiUrl}/getebooking_consignee?user_token=${jwtToken}&sauth_token=${refreshToken}&ssearch_key=${value}`;
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        this.authenticationService
          .refreshToken()
          .pipe(first())
          .subscribe({
            next: () => {},
            error: (error) => {},
          });
        return response;
      })
    );
  }
  getport(refreshToken?: string, value?: string, mode?: string) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    let url = `${environment.apiUrl}/getport?user_token=${jwtToken}&sauth_token=${refreshToken}&skey=${value}&sSea_Air=${mode}`;
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        this.authenticationService
          .refreshToken()
          .pipe(first())
          .subscribe({
            next: () => {},
            error: (error) => {},
          });
        return response;
      })
    );
  }

  getDashboardPO(refreshToken?: string, status?: string, limit?: any) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    const limitValue = limit ? limit : "ALL";
    let url;
    if (status != "") {
      url = `${environment.apiUrl}/getdashboardPO?user_token=${jwtToken}&sauth_token=${refreshToken}&status=${status}&limit=${limitValue}`;
    } else {
      url = `${environment.apiUrl}/getdashboardPO?user_token=${jwtToken}&sauth_token=${refreshToken}&status&limit=${limitValue}`;
    }
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  //po page API

  getpurchaseorder(refreshToken?: string, status?: string, limit?: any) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    const limitValue = limit ? limit : "ALL";
    let url;
    if (status != "") {
      url = `${environment.apiUrl}/getpurchaseorder?user_token=${jwtToken}&sauth_token=${refreshToken}&status=${status}&limit`;
    } else {
      url = `${environment.apiUrl}/getpurchaseorder?user_token=${jwtToken}&sauth_token=${refreshToken}&status&limit`;
    }
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  //getpurchaseorderdetail
  getpurchaseorderdetail(refreshToken?: string, spo_number?: string) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    let url = `${environment.apiUrl}/getpurchaseorderdetail?user_token=${jwtToken}&sauth_token=${refreshToken}&spo_number	=${spo_number}`;
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
  getSailingSchedule(
    refreshToken?: string,
    status?: string,
    limit?: any,
    sType?: any,
    sPOL?: any,
    sFDC?: any
  ) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    const limitValue = limit ? limit : "ALL";
    let url;
    if (status != "") {
      url = `${environment.apiUrl}/getSailingSchedule?user_token=${jwtToken}&sauth_token=${refreshToken}&status=${status}&limit=${limitValue}&sType=${sType}&sPOL=${sPOL}&sFDC=${sFDC}`;
    } else {
      url = `${environment.apiUrl}/getSailingSchedule?user_token=${jwtToken}&sauth_token=${refreshToken}&status&sType=${sType}&sPOL=${sPOL}&sFDC=${sFDC}&limit=${limitValue}`;
    }
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
  createEbooking(data: any) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    let url = `${environment.apiUrl}/create_ebooking`;
    return this.http.post<any>(url, data).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
}
