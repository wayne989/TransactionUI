import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { UserService } from './service/user.service';
import { User } from './model/user';
import { LogoutService } from './service/logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  githubLogoutUrl="https://github.com/logout";
  title = 'Transaction View';
  user:User;
  
  constructor(private router:Router, 
              private userService: UserService,
              private logoutService: LogoutService,
              @Inject(DOCUMENT) private document: any
  ){}

  ngOnInit(){
    this.userService.getUser().subscribe(
      (response)=>{
        // for each subscription
        this.user=response;    
      },
      ()=>{
        // error
      },
      ()=>{
        // complete
        if(this.isUserAuthenticated()){
          this.gotoTransactionView(); 
          console.log("user: " + JSON.stringify(this.user)); 
        }
      }
    );
  }

  isUserAuthenticated(){
    return (this.user && this.user.authenticated=="true");
  }

  gotoTransactionView(){
    this.router.navigate(['transaction']);
  }

  logout(){
    this.logoutService.logout().subscribe(
      ()=>{},
      ()=>{
        this.gotoGitHubLogoutWebsite();
      },
      ()=>{
        this.gotoGitHubLogoutWebsite();
      }
    );      
  }

  gotoGitHubLogoutWebsite(){
    this.document.location.href = this.githubLogoutUrl;
  }
}
