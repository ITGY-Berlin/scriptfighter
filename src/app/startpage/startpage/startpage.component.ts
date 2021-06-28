import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sf-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
