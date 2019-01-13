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
  WING_SIZE = 1;
  fragments = [];
  cursor;

  constructor() {
  }

  ngOnInit() {
    const hour = this.momentSnapshot.tz(this.place).hour();
    this.cursor = hour;
    const left = Array.from({length: this.WING_SIZE})
                      .map((el, index) => {
                        let t = (hour - this.WING_SIZE + index) % 24;
                        return t < 0 ? t + 24 : t;
                      });
    const right = Array.from({length: this.WING_SIZE})
                       .map((el, index) => {
                         return (hour + index + 1) % 24;
                       });
    const all = [...left, hour, ...right]
    this.fragments = all;
  }
}
