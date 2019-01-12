import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';


declare const localStorage;


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  guess = moment.tz.guess();
  baseline = this.guess;
  momentSnapshot = moment();
  myFavorites = [this.guess, 'UTC'];
  selectedPlace: string;
  timezones: string[] = moment.tz.names();

  constructor() {
  }

  ngOnInit() {
    const baseline = localStorage.getItem('baseline');
    if (baseline) {
      this.setBaseline(baseline);
    }
  }

  addFavorite(event) {
    if (event.keyCode === 13) {
      console.log('add', this.selectedPlace)
      const place = this.selectedPlace;
      this.myFavorites.push(place);
      localStorage.setItem('myFavorites', JSON.stringify(this.myFavorites));
    }
  }

  refreshTime() {
    this.momentSnapshot = moment();
  }

  getMomentSnapshot() {
    return this.momentSnapshot;
  }

  setBaseline(tz) {
    localStorage.setItem('baseline', tz);
    this.baseline = tz;
    this.reload();
  }

  reload() {
    const stored = JSON.parse(localStorage.getItem('myFavorites'));
    if (stored) {
      this.myFavorites = [];
      setTimeout( f => {
        this.myFavorites = stored;
      }, 0);
    }
  }

  getBaseline() {
    return this.baseline;
  }

}
