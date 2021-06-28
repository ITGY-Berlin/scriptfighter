import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FirebaseCode } from '../../shared/models';

@Component({
  selector: 'sf-fighter-card',
  templateUrl: './fighter-card.component.html',
  styleUrls: ['./fighter-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FighterCardComponent implements OnInit {
  @Input() fighter!: FirebaseCode;

  constructor() {}

  ngOnInit() {}
}
