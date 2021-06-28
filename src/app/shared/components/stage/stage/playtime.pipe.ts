import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playtime'
})
export class PlaytimePipe implements PipeTransform {

  transform(time: number): number {
    return Math.floor(time / 4);
  }

}
