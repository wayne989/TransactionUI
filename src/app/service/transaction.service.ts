import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/platform-browser'
import { TransactionItem, TransactionDetail } from '../model/transaction';

@Injectable()
export class TransactionService {
  private transactionUrl = 'http://localhost:8000/api/transaction/';

  logoMap: Map<string, string> = new Map<string, string>();
  imgPath:string = "/assets/images/"; 

  constructor(@Inject(DOCUMENT) private document: any, private http: HttpClient) { 
      // for better design, it can be loaded from service or properties file.
      this.logoMap.set('Organization One', 'girl_1.ico');
      this.logoMap.set('Organization Two', 'girl_2.ico');
      this.logoMap.set('Organization Three', 'girl_3.ico');
      this.logoMap.set('Organization Four', 'girl_4.ico');
      this.logoMap.set('Organization Five', 'girl_5.ico');
      this.logoMap.set('Organization Six', 'girl_6.ico');
      this.logoMap.set('Organization Seven', 'girl_7.ico');
      this.logoMap.set('Organization Eight', 'girl_8.ico');
      this.logoMap.set('Organization Nine', 'girl_9.ico');
      this.logoMap.set('Organization Ten', 'girl_10.ico');  
  }

  private getHttpOptions(){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 
                               'X-XSRF-TOKEN': this.getCookie('XSRF-TOKEN')})
    
    };
    return httpOptions;
  }

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  getRequestorLogo(requestor:string):string{
    var logoImg = this.logoMap.get(requestor);
    if(logoImg){
      logoImg = this.imgPath + logoImg; 
    }else{
      logoImg = "";
    }
    return logoImg;
  }

  getTransactions(): Observable<TransactionItem>{
    var url = this.transactionUrl + 'list';
    return this.http.get<TransactionItem>(url);
  }  

  getTransactionDetail(id:string):Observable<TransactionDetail>{
    var url = this.transactionUrl + 'get/' + id;
    return this.http.get<TransactionDetail>(url);
  }

  deleteTransactionDetail(id:string):Observable<TransactionDetail>{
    var url = this.transactionUrl + 'remove/' + id;
    return this.http.delete<TransactionDetail>(url, this.getHttpOptions());
  }

  addTransactionDetail(transactionDetail:TransactionDetail){
    var url = this.transactionUrl + 'save';
    return this.http.post<TransactionDetail>(url, transactionDetail, this.getHttpOptions());
  }
}
