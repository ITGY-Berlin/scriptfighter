import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sf-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgerMenuComponent implements OnInit {
  @Input()
  set isOpen(isOpen: boolean | null) {
    this._isOpen = !!isOpen;
  }
  get isOpen() {
    return this._isOpen;
  }

  @Output() isOpenChange = new EventEmitter<boolean>();

  private _isOpen = false;

  constructor() {}

  ngOnInit() {}

  toggleIsOpen() {
    this._isOpen = !this._isOpen;
    this.isOpenChange.emit(this._isOpen);
  }
}
