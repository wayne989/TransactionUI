import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { UserService } from './user.service';
import { TransactionService } from './transaction.service';
import { LogoutService } from './logout.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'XSRF-TOKEN',
            headerName: 'X-XSRF-TOKEN',
        })
    ],
    providers: [UserService, TransactionService, LogoutService],
    exports: [
        HttpClientModule
    ]
})
export class AppServiceModule {}
