import { Pipe, PipeTransform } from '@angular/core';
import { Documents } from './Documents';
import * as _ from 'lodash';

@Pipe({
    name: 'moviesFilter',
    pure: false
})

export class DocumentsPipe implements PipeTransform {
    transform(array: Documents[], filter: string) {
        if (filter) {
            return _.filter(array, (row =>
                row.category.toLowerCase().indexOf(filter.toLowerCase()) > -1
                || row.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
                || row.relaseDate.toLowerCase().indexOf(filter.toLowerCase()) > -1
            ));
        } return array;
    }
}
