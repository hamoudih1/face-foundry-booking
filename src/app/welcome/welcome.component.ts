import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Config } from 'protractor';
import { Router } from '@angular/router';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  token: any;
  tokenString: string;

  constructor(private appService: AppService, private router: Router, private routerService: RouteService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.appService.endpoint ="http://127.0.0.1:5002/start";
    this.showConfig();
    this.routerService.canAdvance();
    this.router.navigate(['/start']);
  }

  showConfig() {
    this.appService.getConfig()
    .subscribe(responseData => {
      this.token = responseData;
      this.tokenString = this.token.access_token;
      this.appService.access_token_welcome = this.tokenString;
      console.log(this.tokenString);
    });
  }
}
