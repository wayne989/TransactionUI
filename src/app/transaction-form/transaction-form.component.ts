import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TransactionService } from '../service/transaction.service';
import { TransactionDetail } from '../model/transaction';
import { ValidationService } from '../shared/validation/validation.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  transactionForm:FormGroup;
  transactionDetail:TransactionDetail;
  submitted = false;

  constructor(private route:ActivatedRoute, private transactionService: TransactionService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initObject();
  }

  initObject(){
    this.transactionDetail = new TransactionDetail(null,new Date(),'','','','','');
    this.createForm();
  }

  createForm(){
    this.transactionForm = this.fb.group(
      {
        transactionDate: [this.transactionDetail.transactionDate, [Validators.required]],
        requestor: [this.transactionDetail.requestor, [Validators.required]],
        location: [this.transactionDetail.location, [Validators.required]],
        status: [this.transactionDetail.status, [Validators.required]],
        transactionCode: [this.transactionDetail.transactionCode, [Validators.required]],
        description: [this.transactionDetail.description, [Validators.required]]
      }
    );
  }
  prepareSaveTransaction():TransactionDetail{
    const formModel = this.transactionForm.value;
    // return new transactionDetail object containing a 
    // deep copy of changed form model values
    const saveTransaction: TransactionDetail = 
        new TransactionDetail(
          null,
          formModel.transactionDate,
          formModel.requestor,
          formModel.location,
          formModel.status,
          formModel.transactionCode,
          formModel.description          
        );
    return saveTransaction;    
  }
  
  getRequestorLogo(){
    let requestor = this.transactionForm.value.requestor;
    let imgSrc=null;
    if(requestor){
      imgSrc = this.transactionService.getRequestorLogo(requestor);
    }
    return imgSrc;
  }

  onSubmit(){
    this.submitted = true;
    let transactionDetail = this.prepareSaveTransaction();
    this.transactionService.addTransactionDetail(transactionDetail).subscribe(
      res=>{
        this.gotoTransactionListPage('updated');
      }
    )
  }

  onCancel(){
    this.gotoTransactionListPage('none');
  }
  gotoTransactionListPage(action:string){
    this.router.navigate(['transaction', {actionDone: action}]);
  }
}
