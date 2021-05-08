import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import "@angular/compiler";
import * as mapboxgl from "mapbox-gl";
import countries from "./countrycode";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { DashboardService } from "../../_services/dashboard.service";
import { Subscription } from "rxjs/index";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../../_services";

@Component({
  selector: "app-mapbox",
  templateUrl: "./mapbox.component.html",
  styleUrls: ["./mapbox.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapboxComponent implements OnInit, AfterViewInit {
  template: any = "";
  data1: any = [];
  constructor(
    private _elementRef: ElementRef,
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    // console.log("mapbox constructor");
  }

  ngOnInit(): void {
    // console.log("mapbox ngOnInit");
    this.getDashboardMap();
  }

  ngAfterViewInit(): void {
    // this.getDashboardMap();
  }

  getDashboardMap(value?: string) {
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getDashboardMap(userData.Token);
        })
      )
      .subscribe((response: any) => {
        // window.dispatchEvent(new Event("resize"));
        // this.loading = false;
        // console.log("map response", response);
        this.data1 = response.countries;
        this.drawMap(
          this._elementRef.nativeElement.querySelector("#map"),
          response.countries
        );
      });
  }

  drawMap(container: HTMLElement, countrydata: any): any {
    const mapboxAccessToken =
      "pk.eyJ1IjoiYmhhcmF0aG5ld2FnZWdsb2JhbCIsImEiOiJja2ZoN3A3ajUwOXk3MnVwOHQ1N3Z0YmJ2In0.dadI7LZ4521ocUTJ3Y4JtA";
    // let countriesData:any;
    // function getDashboardMap(): any {
    //   // let dashboardservice = new DashboardService();
    //   // let authenticationService = new AuthenticationService();
    //   this.authenticationService
    //       .refreshToken()
    //       .pipe(
    //           switchMap((userData) => {
    //             return this.dashboardService.getDashboardMap();
    //           })
    //       )
    //       .subscribe((response: any) => {
    //         // window.dispatchEvent(new Event("resize"));
    //         // this.loading = false;
    //         // console.log("map response", response);
    //         countriesData =  response;
    //       });
    // }
    Object.assign(mapboxgl, {
      accessToken: mapboxAccessToken,
    });
    const map: any = new mapboxgl.Map({
      container, // container
      style: "mapbox://styles/mapbox/light-v10", // style URL mapbox://styles/mapbox/streets-v11
      center: [74.5, 20], // starting position [lng, lat]
      zoom: 1, // starting zoom
    });

    const size: any = 200;

    function description(e: any): any {
        const flexContainer: any = {
            display: 'flex',
            flexWrap: 'nowrap',
            backgroundColor: 'DodgerBlue'
        }
        const value: any = `./map-component.component.html`;
        const value1: any = e['country-name'];
        return `<div class="row flex-container" fxLayout="row" style="display: flex;
                          flex-wrap: nowrap;
                          background-color: DodgerBlue;">
                                          <div class="col-lg-2 col-sm-2 col-md-2 test" style="background-color: #f1f1f1;
                          width: 50px;
                          margin: 10px;
                          text-align: center;
                          line-height: 15px;
                          font-size: 10px;">${e['country-name']}</div>
                                          <div class="col-lg-2 col-sm-2 col-md-2" style="background-color: #f1f1f1;
                          width: 50px;
                          margin: 10px;
                          text-align: center;
                          line-height: 15px;
                          font-size: 10px;">${e.country_code}</div>
                                          <div class="col-lg-2 col-sm-2 col-md-2" style="background-color: #f1f1f1;
                          width: 50px;
                          margin: 10px;
                          text-align: center;
                          line-height: 15px;
                          font-size: 10px;">${e.destination}</div>
                                          <div class="col-lg-2 col-sm-2 col-md-2" style="background-color: #f1f1f1;
                          width: 50px;
                          margin: 10px;
                          text-align: center;
                          line-height: 15px;
                          font-size: 10px;">${e.hbl_no}</div>
                                          <div class="col-lg-2 col-sm-2 col-md-2" style="background-color: #f1f1f1;
                          width: 50px;
                          margin: 10px;
                          text-align: center;
                          line-height: 15px;
                          font-size: 10px;">${e.ETA}</div>
                                          <div class="col-lg-2 col-sm-2 col-md-2" style="background-color: #f1f1f1;
                          width: 50px;
                          margin: 10px;
                          text-align: center;
                          line-height: 15px;
                          font-size: 10px;">${e.ponumber}</div>
               </div>`;
    }
    function pulsingDot(a: any): any {
      map.addImage(
        "pulsing-dot" + a,
        {
          width: size,
          height: size,
          data: new Uint8Array(size * size * 4),

          // get rendering context for the map canvas when layer is added to the map
          onAdd: function (): any {
            const canvas: any = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext("2d");
          },

          // called once before every frame where the icon will be used
          render: function (): any {
            const duration: any = 1000;
            const t: any = (performance.now() % duration) / duration;

            const radius: any = (size / 2) * 0.3;
            const outerRadius: any = (size / 2) * 0.7 * t + radius;
            const context: any = this.context;
            // draw inner circle
            context.beginPath();
            context.arc(
              this.width / 2,
              this.height / 2,
              radius,
              0,
              Math.PI * 2
            );
            context.fillStyle = "rgba(255, 100, 100, 1)";
            context.strokeStyle = "white";
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();
            context.font = "20pt Calibri";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText(a, 100, 100 + 3);

            // update this image's data with data from the canvas
            this.data = context.getImageData(
              0,
              0,
              this.width,
              this.height
            ).data;

            // continuously repaint the map, resulting in the smooth animation of the dot
            //         map.triggerRepaint();

            // return `true` to let the map know that the image was updated
            return true;
          },
        },
        { pixelRatio: 2 }
      );
      return "pulsing-dot" + a;
    }
    // function addControls(): void {
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
      new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: "metric",
      })
    );
    map.addControl(new mapboxgl.FullscreenControl());
    // }
    map.on("load", function (): any {
      const country = countrydata.map((e: any, i: any) => {
        // const dot = e.
        const a = {
          type: "Feature",
          properties: {
            description: description(e),
            icon: pulsingDot(Number(e.no_of_shipments)),
          },
          geometry: {
            type: "Point",
            coordinates: [
              countries[e.country_code][1],
              countries[e.country_code][0],
            ],
          },
        };
        return a;
      });
      // console.log("countries data", country);
      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: country,
        },
      });
      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": "{icon}",
          "icon-allow-overlap": true,
        },
      });
    });
    map.on("click", "places", (e: any) => {
      const coordinates: any = e.features[0].geometry.coordinates.slice();
      const description: any = e.features[0].properties.description;
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "places", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "places", () => {
      map.getCanvas().style.cursor = "";
    });
  }
}
