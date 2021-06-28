import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'sf-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationComponent implements OnInit {
  @HostBinding('class') hostClassList = 'py-4';

  constructor() { }

  ngOnInit(): void {
  }

}
