import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { TransactionService } from '../service/transaction.service';
import { TransactionDetail } from '../model/transaction';

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.css']
})
export class TransactionInfoComponent implements OnInit {
  transactionDetail:TransactionDetail;
  constructor(private transactionService: TransactionService, private route:ActivatedRoute, private router:Router) { }
  isDeleted=false;

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap)=>{
        let transactionId = params.get('transactionId');
        console.log("paramMap this.transactionId: " + transactionId);
        this.transactionService.getTransactionDetail(transactionId).subscribe(
          (resp)=>{
            this.transactionDetail = resp;
            console.log("paramMap transactionDetail:" + JSON.stringify(this.transactionDetail));
          }
        )
      }
    );  
  }

  getRequestorLogo(requestor:string){
    return this.transactionService.getRequestorLogo(requestor);
  }

  onCancel(){
    this.router.navigate(['transaction', {actionDone: "none"}]);      
  }

  onDelete(){
    if(this.transactionDetail && this.transactionDetail.id){
      let transactionId = String(this.transactionDetail.id);
      this.transactionService.deleteTransactionDetail(transactionId).subscribe(
        (resp)=>{
          this.transactionDetail = resp;
          this.isDeleted = true;
          this.router.navigate(['transaction', {actionDone: "deleted"}]); 
        }
      )    
    }
  }
}
