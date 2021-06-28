import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FirebaseCode } from '../../shared/models';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'sf-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {
  value = '';
  fighterList: FirebaseCode[] = [];

  constructor(private firebaseService: FirebaseService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {}

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
  }

  async search() {
    const data = await this.firebaseService.loadCodeOfFighter(this.value).toPromise();
    if (data) {
      console.log(data);
    }
  }

  async getList() {
    this.fighterList = await this.firebaseService.loadList();
    this.changeDetectorRef.markForCheck();
  }
}
