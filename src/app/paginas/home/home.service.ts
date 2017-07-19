import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { UtilService } from '../../util/util.service';

@Injectable()
export class HomeService {

  constructor(private http: Http, private util: UtilService) {

  }

  retornaTodosTickets(empresa: number, user: number){
    return this.http.get('http://localhost:3000/api/tickets/all/empresa/'+empresa+'/'+user).map(res => res.json()).toPromise();
  }

}
