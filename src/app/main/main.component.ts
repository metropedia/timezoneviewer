import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';


declare const localStorage;


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  myTimezone = moment.tz.guess();
  momentSnapshot = moment();
  myFavorites = [];
  selectedPlace: string;
  states: string[] = moment.tz.names();

  constructor() {
  }

  ngOnInit() {
    this.myFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
  }

  addFavorite(event) {
    if (event.keyCode == 13) {
      console.log('add', this.selectedPlace)
      const place = {
        name: this.selectedPlace
      };
      this.myFavorites.push(place);
      localStorage.setItem('myFavorites', JSON.stringify(this.myFavorites));
    }
  }

}
