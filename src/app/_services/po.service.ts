import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class POservice {
    constructor(private http: HttpClient,
    ) {
    }

    addSku(data: any, token: any): any {
        let data1:any = data;
        data1.sauth_token = token;
        const url: any = `${environment.apiUrl}/add_sku`;
        return this.http.post<any>(url, data1).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }
}