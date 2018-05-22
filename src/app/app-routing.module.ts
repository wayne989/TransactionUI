import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './login/login.component';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

const appRoutes: Routes = [
    { path: 'transaction', component: TransactionComponent },
    { path: 'transaction-info', component:TransactionInfoComponent },
    { path: 'transaction-form', component: TransactionFormComponent },
    { path: '**', component: LoginComponent }
];

@NgModule({
    imports: [
            RouterModule.forRoot(
                appRoutes,
                { enableTracing: true } // <-- debugging purposes only
            )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}