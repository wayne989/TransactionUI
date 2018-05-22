import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { TransactionService } from '../service/transaction.service';
import { TransactionItem } from '../model/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  
  transactionItem$: Observable<TransactionItem>;

  constructor(private transactionService:TransactionService, private router:Router) { }

  ngOnInit() {
    this.transactionItem$ = this.transactionService.getTransactions();
  }

  viewDetail(transactionItem:TransactionItem){
    if(transactionItem && transactionItem.id){
      this.router.navigate(['transaction-info', {transactionId: transactionItem.id}]);
    }
  }

  addDetail(){
    this.router.navigate(['transaction-form', {}]);
  }
}
