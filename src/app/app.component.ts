import { Component, ViewChild } from '@angular/core';
import { MatDrawerContainer, MatSidenav } from '@angular/material/sidenav';

interface Message {
  content: string;
  isIncoming: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatDrawerContainer) drawerContainer!: MatDrawerContainer;
  // @ViewChild('sidenav') sidenav!: MatSidenav;
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

  openDrawerContainer(): void {
    this.drawerFlag = true;
    this.drawerContainer.open();
  }

  closeDrawerContainer(): void {
    this.drawerFlag = false;
    this.drawerContainer.close();
  }

}
