import { Component, ViewChild } from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ITEMS } from './mock-items';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(SideMenuComponent) sideMenu!: SideMenuComponent;
  placesService!: google.maps.places.PlacesService;

  get visible(): boolean {
    return this.items[0].toggled;
  };

  items: Item[] = ITEMS;


  zoom = 16;
  // 地図のオプション
  options: google.maps.MapOptions = {
    disableDefaultUI: true
  };

  // 現在位置マーカーの座標
  currentPosition!: google.maps.LatLngLiteral;
  // 現在位置マーカーのオプション
  currentPositionMarkerOption: google.maps.MarkerOptions = {
    icon: {
      url: "assets/img/position.png",
      scaledSize: new google.maps.Size(32, 32)
    },
  };

  constructor() {}

  ngOnInit() {
    // 現在位置を取得する。
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
    // 検索を行い、結果を受け取る。
    this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
    this.search();
  }

  search() {
    const request = {
      location: this.currentPosition, // 緯度経度を指定
      radius: 5000, // 検索半径を指定（メートル単位）
      query: 'coffee', // 検索語句を指定
    };
    this.placesService!.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results); // 検索結果を表示
      }
    });
  }
}
