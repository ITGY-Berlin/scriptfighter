import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Increasing integer for generating unique ids for sf-toggle-switch components.
let nextUniqueId = 0;

@Component({
  selector: 'sf-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSwitchComponent implements OnInit {
  @Input() checked: boolean | null = false;
  @Input() id: string | undefined;
  @Input() name: string | undefined;

  @Output() checkedChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
    if (!this.id) {
      this.id = `sf-toggle-switch-${++nextUniqueId}`;
    }
  }

  onChangeEvent(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.checkedChange.emit(checked);
  }
}
