import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppServiceModule } from './service/service.module';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './login/login.component';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { DateValueAccessor } from './shared/date-value-accessor';
import { ControlMessagesComponent } from './shared/validation/control-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    LoginComponent,
    TransactionInfoComponent,
    TransactionFormComponent,
    DateValueAccessor,
    ControlMessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppServiceModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
