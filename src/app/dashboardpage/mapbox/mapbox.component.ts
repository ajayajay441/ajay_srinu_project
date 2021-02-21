
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import '@angular/compiler';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapboxComponent implements OnInit {
  template: any = '';
  constructor() {
    // drawMap();
  }
  ngOnInit(): void {
    this.drawMap();
  }

  drawMap(): any {
    const mapboxAccessToken = 'pk.eyJ1IjoiYmhhcmF0aG5ld2FnZWdsb2JhbCIsImEiOiJja2ZoN3A3ajUwOXk3MnVwOHQ1N3Z0YmJ2In0.dadI7LZ4521ocUTJ3Y4JtA';

    Object.assign(mapboxgl, {
      accessToken: mapboxAccessToken
    });
    const map: any = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/light-v10', // style URL mapbox://styles/mapbox/streets-v11
      center: [74.5, 20], // starting position [lng, lat]
      zoom: 1// starting zoom
    });

    const size: any = 200;

    function description(): any {
      const value: any = `./map-component.component.html`;
      return `<div></div>`;
    }
    function pulsingDot(a: any): any {
      map.addImage('pulsing-dot' + a, {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd: function (): any {
          const canvas: any = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
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
          context.fillStyle = 'rgba(255, 100, 100, 1)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();
          context.font = '20pt Calibri';
          context.fillStyle = 'white';
          context.textAlign = 'center';
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
        }
      }, { pixelRatio: 2 })
      return 'pulsing-dot' + a;
    }
    // function addControls(): void {
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'metric'
    }));
    map.addControl(new mapboxgl.FullscreenControl());
    // }
    map.on('load', function (): any {
      map.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                description: '',
                icon: pulsingDot(10)
              },
              geometry: {
                type: 'Point',
                coordinates: [-100.038659, 20.931567]
              }
            },
            {
              type: 'Feature',
              properties: {
                description: description(),
                icon: pulsingDot(2)
              },
              geometry: {
                type: 'Point',
                coordinates: [20, 20]
              }
            },
            {
              type: 'Feature',
              properties: {
                description: '<div w3-inlcude-html="h1.html"></div><strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
                icon: pulsingDot(3)
              },
              geometry: {
                type: 'Point',
                coordinates: [-2, 54]
              }
            },
            {
              type: 'Feature',
              properties: {
                description: '<strong>Ballston Arts & Crafts Market</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
                icon: pulsingDot(4)
              },
              geometry: {
                type: 'Point',
                coordinates: [100, 60.943951]
              }
            },
            {
              type: 'Feature',
              properties: {
                description: '<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>',
                icon: pulsingDot(5)
              },
              geometry: {
                type: 'Point',
                coordinates: [133, -27]
              }
            },
            {
              type: 'Feature',
              properties: {
                description: '<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
                icon: pulsingDot(6)
              },
              geometry: {
                type: 'Point',
                coordinates: [-95, 60]
              }
            },
            {
              type: 'Feature',
              properties: {
                description: '<div style="color:red">test</div><strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
                icon: pulsingDot(7)
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.031706, 38.914581]
              }
            },
            {
              type: 'Feature',
              properties: {
                description: '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
                icon: pulsingDot(8)
              },
              geometry: {
                type: 'Point',
                coordinates: [-32.020945, 65.878241]
              }
            },
            {
              type: 'Feature',
              properties: {
                description: '<strong>India popup</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">India</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
                icon: pulsingDot(9)
              },
              geometry: {
                type: 'Point',
                coordinates: [78, 20]
              }
            }
          ]
        }
      });

      map.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        layout: {
          'icon-image': '{icon}',
          'icon-allow-overlap': true
        }
      });
      map.on('click', 'places', (e: any) => {
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
      map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
      });


    });
  }
}
