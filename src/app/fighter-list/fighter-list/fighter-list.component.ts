import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseCode } from '../../shared/models';
import { CodeService } from '../../shared/services/code.service';

@Component({
  selector: 'sf-fighter-list',
  templateUrl: './fighter-list.component.html',
  styleUrls: ['./fighter-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FighterListComponent implements OnInit {
  @HostBinding('class') hostClassList = 'py-4';

  fighterList!: FirebaseCode[];

  displayMode: 'grid' | 'list' = 'list';

  constructor(private activatedRoute: ActivatedRoute, private codeService: CodeService) {}

  ngOnInit() {
    this.fighterList = this.activatedRoute.snapshot.data.fighterList;
  }

  setEnemy(fighter: FirebaseCode) {
    const { code, name } = fighter;
    this.codeService.setCode(code, 2);
    this.codeService.setFighterName(name, 2);
  }
}
