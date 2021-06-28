import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./startpage/startpage.module').then((m) => m.StartpageModule),
  },
  {
    path: 'editor',
    loadChildren: () => import('./editor/editor.module').then((m) => m.EditorModule),
  },
  {
    path: 'playback',
    loadChildren: () => import('./playback/playback.module').then((m) => m.PlaybackModule),
  },
  {
    path: 'list',
    loadChildren: () => import('./fighter-list/fighter-list.module').then((m) => m.FighterListModule),
  },
  {
    path: 'playground',
    loadChildren: () => import('./playground/playground.module').then((m) => m.PlaygroundModule),
  },
  {
    path: 'impressum',
    loadChildren: () => import('./impressum/impressum.module').then((m) => m.ImpressumModule),
  },
  {
    path: 'documentation',
    loadChildren: () => import('./documentation/documentation.module').then((m) => m.DocumentationModule),
  },
  {
    path: 'fighter',
    loadChildren: () => import('./fighter-playground/fighter-playground.module').then((m) => m.FighterPlaygroundModule),
  },
  {
    path: 'engine',
    loadChildren: () => import('./engine-playground/engine-playground.module').then((m) => m.EnginePlaygroundModule),
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
