import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, CameraPosition, GoogleMapsMarkerOptions, GoogleMapsMarker, Geolocation } from 'ionic-native';
import 'rxjs/add/operator/map';

declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'page-location',
  templateUrl: 'localization.html'
})

export class Localization {

  private map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private _zone: NgZone, public alertCrl: AlertController) {
    this.platform.ready().then(() => this.onPlatformReady());
  }

  private onPlatformReady(): void {}


  ngAfterViewInit(){
    var networkState = navigator.connection.type;
    console.log("CHECK NETWORK: ",networkState);
    
    if(networkState == Connection.NONE){
       let alert = this.alertCrl.create({
                title: "Error",
                subTitle: "No internet connection.",
                buttons: ["OK"]
            });
            alert.present();
    }
    else{
      Geolocation.getCurrentPosition().then((position) => {

        GoogleMap.isAvailable().then(() => {

          this.map = new GoogleMap('map_canvas',{
                'backgroundColor': 'white',
                'controls': {
                    'compass': true,
                    'myLocationButton': true,
                    'zoom': true
                }
          });
          this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

            this._zone.run(() => {
              let carRental = new GoogleMapsLatLng(-23.461791,-46.874861);

              let positionCarRental: CameraPosition = {
                target: carRental,
                zoom: 10,
              };

              this.map.moveCamera(positionCarRental);

              let markerOptionsCR: GoogleMapsMarkerOptions = {
                position: carRental,
                title: 'Car Rental\nAv. Marte, 489'
              };

              this.map.addMarker(markerOptionsCR)
                .then((markerCR: GoogleMapsMarker) => {
                  markerCR.showInfoWindow();
                });
            });
          });
        });
      });
    }
  }
  
}
