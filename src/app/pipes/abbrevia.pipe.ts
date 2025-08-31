import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbrevia'
})
export class AbbreviaPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toString().substring(0,3).toLocaleUpperCase('it');
  }

}
