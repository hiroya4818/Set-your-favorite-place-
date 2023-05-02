import { Component, ViewChild } from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(SideMenuComponent) sideMenu!: SideMenuComponent;
  // @ViewChild('sidenav') sidenav!: MatSidenav;

  get visible(): boolean {
    return this.items[0].toggled;
  };

  items = [
    { name: 'Your position', toggled: true, url: "assets/img/position.png"},
    { name: 'コンビニ', toggled: true, url: "assets/img/position.png"},

  ];


  drawerFlag = false;
  zoom = 16;
  // 東新宿駅の座標
  center: google.maps.LatLngLiteral = {
    lat: 35.697695,
    lng: 139.707354
  };
  // 地図のオプション
  options: google.maps.MapOptions = {
    disableDefaultUI: true
  };
  showFiller = false;

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
  }
}
