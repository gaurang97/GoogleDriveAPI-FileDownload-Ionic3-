
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RandomUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RandomUserProvider {

 
  constructor(public _http: Http) {
    console.log('Hello RandomUserProvider Provider');
  }
 
  loadRandomUsers(){
    return this._http.get("https://www.googleapis.com/drive/v2/files?q='1oAYI_fM9trxt2D1EvVw7V8c4vIDogwf0'+in+parents&key=AIzaSyB1eeDqBxiKK38UNKlxBkcKyFFZFwh6RIE")
    .map((res) =>
   { return res.json()['items'];
   });
  }
 
 
  
}