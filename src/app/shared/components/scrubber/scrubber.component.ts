import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sf-scrubber',
  templateUrl: './scrubber.component.html',
  styleUrls: ['./scrubber.component.scss']
})
export class ScrubberComponent implements OnInit {

  @Input() max = 100;

  @Input()
  set position(value: number) {
    this._position = value;
  }
  get position(): number {
    return this._position;
  }

  @Output()
  positionChange = new EventEmitter<number>();

  private _position = 0;

  constructor() { }

  ngOnInit() {
  }

  inputChange(event: Event) {
    const target = event.target as any;
    this._position = parseInt(target.value, 10);
    this.positionChange.next(this._position);
  }

}
