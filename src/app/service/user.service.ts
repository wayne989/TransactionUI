import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../model/user';

@Injectable()
export class UserService {
  private userUrl = 'http://localhost:8000/api/user/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUser(): Observable<User>{
    var url = this.userUrl;
    return this.http.get<User>(url);
  }  
}
