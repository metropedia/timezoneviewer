import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-timebar',
  templateUrl: './timebar.component.html',
  styleUrls: ['./timebar.component.scss']
})
export class TimebarComponent implements OnInit {
  @Input('momentSnapshot') momentSnapshot;
  @Input('place') place;
  @Input('baseline') baseline;

  fragments = Array.from({length: 24}).map( (el, index) => index );
  cursor;
  left = Array(0);

  constructor() {
  }

  ngOnInit() {
    this.cursor = this.momentSnapshot.tz(this.place).hour();
    const baseOffset = this.momentSnapshot.tz(this.baseline).utcOffset()/60;
    const offset = this.momentSnapshot.tz(this.place).utcOffset()/60;
    // console.log(offset - baseOffset);
    const hour = this.momentSnapshot.tz(this.place).hour();
    const baseHour = this.momentSnapshot.tz(this.baseline).hour();
    const left = hour - baseHour;

    if (left < 0) {
      this.left = Array.from({length: Math.abs(left)})
                       .map( (el, index) => index + 24 + left );
    }
    if (left > 0) {
      this.fragments = this.fragments.slice(left, this.fragments.length);
    }
    // console.log(hour, baseHour, left)
  }

}
