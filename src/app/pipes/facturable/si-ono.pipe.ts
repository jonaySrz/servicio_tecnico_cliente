import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siOno'
})
export class SiOnoPipe implements PipeTransform {

  transform(value: Boolean): String {
    return value ? 'Facturable' : ' No facturable';
  }

}
