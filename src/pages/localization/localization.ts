import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, CameraPosition, GoogleMapsMarkerOptions, GoogleMapsMarker, GoogleMapsAnimation } from 'ionic-native';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-location',
  templateUrl: 'localization.html'
})

export class Localization {

  private map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.platform.ready().then(() => this.onPlatformReady());
  }

  private onPlatformReady(): void {}


  ngAfterViewInit(){

    GoogleMap.isAvailable().then(() => {

      this.map = new GoogleMap('map_canvas');
      this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

        this._zone.run(() => {
          let carRental = new GoogleMapsLatLng(-23.461791,-46.874861);

          let positionCarRental: CameraPosition = {
            target: carRental,
            zoom: 10,
            tilt: 28
          };

          this.map.moveCamera(positionCarRental);

          let markerOptionsCR: GoogleMapsMarkerOptions = {
            position: carRental,
            animation: GoogleMapsAnimation.DROP,
            title: 'Car Rental'
          };

          this.map.addMarker(markerOptionsCR)
            .then((marker: GoogleMapsMarker) => {
              marker.showInfoWindow();
            });
          //this.map.animateCamera({ target: carRental, zoom: 10 });
        });

      });
    });
    
  }
  
}
