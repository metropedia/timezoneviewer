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

  FRAG_WIDTH_EXPAND = 60;//Pixel
  FRAG_WIDTH = 30;//Pixel
  FRAGMENTS = 24;
  fragments = Array.from({length: this.FRAGMENTS}).map( (el, index) => index );
  cursor;
  left = Array(0);
  right = Array(0);

  constructor() {
  }

  ngOnInit() {
    const baseOffset = this.momentSnapshot.tz(this.baseline).utcOffset()/60;
    const offset = this.momentSnapshot.tz(this.place).utcOffset()/60;
    // console.log(offset - baseOffset);
    const hour = this.momentSnapshot.tz(this.place).hour();
    const baseHour = this.momentSnapshot.tz(this.baseline).hour();
    const left = - baseHour + hour;

    this.cursor = hour;

    // missing hours on the left, extend to the left
    if (left < 0) {
      this.left = Array.from({length: Math.abs(left)})
                       .map( (el, index) => index + this.FRAGMENTS + left );
      const right = this.FRAGMENTS + left;
      this.fragments = this.fragments.slice(0, right);
    }
    // missing hours on the right, extend to the right
    if (left > 0) {
      this.fragments = this.fragments.slice(left, this.FRAGMENTS);
      const right = this.FRAGMENTS - this.fragments.length;
      this.right = Array.from({length: Math.abs(right)})
                       .map( (el, index) => index );
    }
  }

}
