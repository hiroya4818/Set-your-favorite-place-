import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ITEMS } from './mock-items';
import { Item } from './item';
import { Place } from './place';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges,OnInit {
  @ViewChild(SideMenuComponent) sideMenu!: SideMenuComponent;
  placesService!: google.maps.places.PlacesService;
  makerPositions: {
    positions: google.maps.LatLngLiteral,
    options: google.maps.MarkerOptions,
  }[] = [];

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

  searchPlaces: Place[] = [];
  placesLibraryLoaded = false;
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
    // this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
    this.loadPlacesLibrary();
  }

  ngOnChanges() {
    console.log('changes');
    if(this.items.length !== 0) {
      this.search(this.items[0].name);

    }
  }

  a(): void{
    console.log(this.items);
    this.search(this.items[1].name)
  }

  loadPlacesLibrary() {
    // Google Maps Placesライブラリを非同期で読み込みます
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD3vh08LVyrHoV6qqHdjTthmTbMix14NsU&libraries=places';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      this.placesLibraryLoaded = true;
    };
  }

  search(keyword: string) :void{
    if(!this.placesLibraryLoaded) {
      setTimeout(this.search, 100);
    } else {
      // 検索範囲を指定
      const bounds = new google.maps.Circle({
        center: this.currentPosition,
        radius: 500 // 5 km radius
      }).getBounds();
      console.log(this.currentPosition)
      const request: google.maps.places.TextSearchRequest = {
        query: keyword,
        location: this.currentPosition,
        radius: 500,
        // fields: ['name', 'geometry', 'formatted_address', 'rating'] // 名前、位置情報、住所、評価のフィールドを取得
      };
      const service = new google.maps.places.PlacesService(document.createElement('div'));

      service.textSearch(request, (results, status) => {
        console.log('Results:', results);
        console.log('Status:', status);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // results?.map((result, index) => {
          //   if(index > 3) return;
            // this.searchPlaces[index] = {
            //   position: {
            //     lat: result.geometry!.location!.lat(),
            //     lng: result.geometry!.location!.lng(),
            //   },
            //   option: {
            //     icon: {
            //       url: "assets/img/bird.png",
            //       scaledSize: new google.maps.Size(32, 32)
            //     },
            //   },
            //   visible: true,
            // };
          // })
          results?.forEach((result) => {
            console.log()
            this.makerPositions?.push({
              positions: {
                lat: result.geometry!.location!.lat(),
                lng: result.geometry!.location!.lng()
              },
              options: {
                icon: {
                  url: "assets/img/bird.png",
                  scaledSize: new google.maps.Size(32, 32)
                },
              }
            })
            console.log(this.makerPositions)
          })
          console.log(results);
        } else {
          console.error('検索に失敗しました。');
        }

      });
    }
  }
}
