import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ListService {
  saved: any[];

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('items');
    if (saved) {
      this.saved = JSON.parse(saved);
    } else {
      this.saved = [];
    }
  }

  get() {
    return this.http.get('https://rawgit.com/tjvantoll/ShinyDex/master/assets/151.json')
      .pipe(
        map((data: any) => {
          const returnData = [];
          data.results.forEach((item) => {
            item.selected = this.saved.indexOf(item.id) !== -1;
            returnData.push(item);
          });
          return returnData;
        })
      );
  }

  toggleSelected(item) {
    if (item.selected) {
      this.saved.splice(this.saved.indexOf(item.id), 1);
    } else {
      this.saved.push(item.id);
    }

    item.selected = !item.selected;
    this.save();
  }

  save() {
    localStorage.setItem('items', JSON.stringify(this.saved));
  }
}
