import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FirebaseCode } from '../../shared/models';

@Component({
  selector: 'sf-fighter-list-item',
  templateUrl: './fighter-list-item.component.html',
  styleUrls: ['./fighter-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FighterListItemComponent implements OnInit {
  @Input() fighter!: FirebaseCode;

  constructor() {}

  ngOnInit() {}
}
