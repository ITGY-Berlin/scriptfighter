import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'sf-health-bar',
  templateUrl: './health-bar.component.html',
  styleUrls: ['./health-bar.component.scss']
})
export class HealthBarComponent implements OnInit {

  @HostBinding('style.width.%')
  @Input()
  hp = 100;

  constructor() { }

  ngOnInit() {
  }

}
