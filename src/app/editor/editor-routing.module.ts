import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './containers/editor/editor.component';
import { EditorGuard } from './editor.guard';
import { FighterDataByNameResolver } from './fighter-data-by-name.resolver';
import { FighterDataResolver } from './fighter-data.resolver';
import { PlaybackGuard } from './playback.guard';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    canActivate: [EditorGuard],
    canDeactivate: [EditorGuard],
  },
  {
    path: 'fighter/:name',
    component: EditorComponent,
    canActivate: [EditorGuard],
    canDeactivate: [EditorGuard],
    resolve: {
      fighter: FighterDataByNameResolver,
    },
  },
  {
    path: ':uid',
    component: EditorComponent,
    canActivate: [EditorGuard],
    canDeactivate: [EditorGuard],
    resolve: {
      fighter: FighterDataResolver,
    },
  },
  {
    outlet: 'overlay',
    path: 'playback',
    loadChildren: () => import('./../playback/playback.module').then((m) => m.PlaybackModule),
    canActivate: [PlaybackGuard],
    canDeactivate: [PlaybackGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
