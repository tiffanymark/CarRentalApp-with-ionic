import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, CameraPosition, GoogleMapsMarkerOptions, GoogleMapsMarker, GoogleMapsAnimation, Geolocation } from 'ionic-native';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-location',
  templateUrl: 'localization.html'
})

export class Localization {

  private map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private _zone: NgZone) {
    this.platform.ready().then(() => this.onPlatformReady());
  }

  private onPlatformReady(): void {}


  ngAfterViewInit(){
    Geolocation.getCurrentPosition().then((position) => {

      GoogleMap.isAvailable().then(() => {

        this.map = new GoogleMap('map_canvas');
        this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

          this._zone.run(() => {
            let carRental = new GoogleMapsLatLng(-23.461791,-46.874861);
            let user = new GoogleMapsLatLng(position.coords.latitude,position.coords.longitude);

            let positionCarRental: CameraPosition = {
              target: carRental,
              zoom: 10,
              tilt: 28
            };

            let positionUser: CameraPosition = {
              target: user,
              zoom: 10,
              tilt: 28
            }

            this.map.moveCamera(positionCarRental);

            let markerOptionsCR: GoogleMapsMarkerOptions = {
              position: carRental,
              animation: GoogleMapsAnimation.DROP,
              title: 'Car Rental'
            };

            let markerOptionsU: GoogleMapsMarkerOptions = {
              position: user,
              title: 'You'
            }

            this.map.addMarker(markerOptionsCR)
              .then((marker: GoogleMapsMarker) => {
                marker.showInfoWindow();
              });

            this.map.addMarker(markerOptionsU)
              .then((marker: GoogleMapsMarker) => {
                marker.showInfoWindow();
              }); 
          });
        });
      });
    });
  }
  
}
