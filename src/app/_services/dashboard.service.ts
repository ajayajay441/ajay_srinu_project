import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "../../environments/environment";
import { AuthenticationService } from "./authentication.service";
import { map } from "rxjs/operators";
import { first } from "rxjs/internal/operators";

@Injectable({ providedIn: "root" })
export class DashboardService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService
  ) {}

  getDashboardShipments(refreshToken?: string, status?: string, limit?: any) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    const limitValue = limit ? limit : "ALL";
    let url;
    if (status != "") {
      url = `${environment.apiUrl}/getdashboardshipment?user_token=${jwtToken}&sauth_token=${refreshToken}&status=${status}&limit=${limitValue}`;
    } else {
      url = `${environment.apiUrl}/getdashboardshipment?user_token=${jwtToken}&sauth_token=${refreshToken}&status=&limit=${limitValue}`;
    }
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

  getDashboardQuotation(
    refreshToken?: string,
    status?: string,
    limit?: any,
    filetr?: any
  ) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    const limitValue = limit ? limit : "";
    const filetrValue = filetr ? filetr : "";
    let url;
    if (status != "") {
      url = `${environment.apiUrl}/getdashboardQuotation?user_token=${jwtToken}&sauth_token=${refreshToken}&status=${status}&limit=${limitValue}&sfilter_status=${filetrValue}`;
    } else {
      url = `${environment.apiUrl}/getdashboardQuotation?user_token=${jwtToken}&sauth_token=${refreshToken}&status&limit=${limitValue}&sfilter_status=${filetrValue}`;
    }
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
  getQuoteDetail(refreshToken?: string, squote_no?: any) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    let url = `${environment.apiUrl}/getQuotedetail?user_token=${jwtToken}&sauth_token=${refreshToken}&squote_no=${squote_no}`;
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  getDashboardInvoice(refreshToken?: string, status?: string, limit?: any) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    const limitValue = limit ? limit : "";
    let url;
    if (status != "" || status != undefined) {
      url = `${environment.apiUrl}/getdashboardInvoice?user_token=${jwtToken}&sauth_token=${refreshToken}&status=${status}&limit=${limitValue}`;
    } else {
      url = `${environment.apiUrl}/getdashboardInvoice?user_token=${jwtToken}&sauth_token=${refreshToken}&status&limit=${limitValue}`;
    }
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
  getinvoicedetail(refreshToken?: string, sinvoice_no?: any) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    let url = `${environment.apiUrl}/getinvoicedetail?user_token=${jwtToken}&sauth_token=${refreshToken}&sinvoice_no=${sinvoice_no}`;
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
  getDashboardThingsToDo(refreshToken?: string, status?: string, limit?: any) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    const limitValue = limit ? limit : "ALL";
    let url;
    if (status != "") {
      url = `${environment.apiUrl}/getdashboardThings?user_token=${jwtToken}&sauth_token=${refreshToken}&status=${status}&limit=${limitValue}`;
    } else {
      url = `${environment.apiUrl}/getdashboardThings?user_token=${jwtToken}&sauth_token=${refreshToken}&status&limit=${limitValue}`;
    }
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
  getDashboardMap(refreshToken?: string, status?: string, limit?: any) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    const limitValue = limit ? limit : "ALL";
    let url;
    if (status !== "") {
      url = `${environment.apiUrl}/getdashboardMap?user_token=${jwtToken}&sauth_token=${refreshToken}&status&limit`;
    } else {
      url = `${environment.apiUrl}/getdashboardMap?user_token=${jwtToken}&sauth_token=${refreshToken}&status&limit`;
    }
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
  getDashboardSailings(refreshToken?: string, status?: string, limit?: any) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    const limitValue = limit ? limit : "ALL";
    let url;
    if (status != "") {
      url = `${environment.apiUrl}/getdashboardSailings?user_token=${jwtToken}&sauth_token=${refreshToken}&status=${status}&limit=${limitValue}`;
    } else {
      url = `${environment.apiUrl}/getdashboardSailings?user_token=${jwtToken}&sauth_token=${refreshToken}&status&limit=${limitValue}`;
    }
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
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
