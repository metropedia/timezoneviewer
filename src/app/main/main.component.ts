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
  actionVisibility = {};

  constructor() {
  }

  ngOnInit() {
    const baseline = localStorage.getItem('baseline');
    if (baseline) {
      this.setBaseline(baseline);
    }
  }

  clearSearch() {
    this.selectedPlace = '';
  }

  addFavorite() {
    console.log('add', this.selectedPlace);
    const place = this.selectedPlace;

    if (this.myFavorites.indexOf(place) === -1) {
      this.myFavorites.push(place);
      this.saveFavorite(this.myFavorites);
    }
  }

  saveFavorite(list) {
    localStorage.setItem('myFavorites', JSON.stringify(list));
  }

  refreshTime() {
    this.momentSnapshot = moment();
  }

  getMomentSnapshot() {
    return this.momentSnapshot;
  }

  setBaseline(tz) {
    this.resetActionVisibility();
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

  splitBySlash(text) {
    const parts = text.split('/');
    return parts.length > 1 ? parts : ['', text];
  }

  onSwipe(event, i) {
    this.resetActionVisibility();
    this.setActionVisibility(i, true);
  }

  resetActionVisibility() {
    this.actionVisibility = {};
  }

  setActionVisibility(i, visibility) {
    this.actionVisibility[i] = visibility;
  }

  deleteFavorite(i) {
    const base = this.myFavorites.indexOf(this.getBaseline());

    this.myFavorites.splice(i, 1);
    this.saveFavorite(this.myFavorites);
    this.setActionVisibility(i, false);
    
    if ( base === i ) {
      this.setBaseline(null);
    }
  }
}
