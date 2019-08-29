import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Config } from 'protractor';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  token: any;
  tokenString: string;

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.appService.endpoint ="http://127.0.0.1:5002/start";
    this.showConfig();
  }

  showConfig() {
    this.appService.getConfig()
    .subscribe(responseData => {
      this.token = responseData;
      this.tokenString = this.token.access_token;
      this.appService.access_token = this.tokenString;
      console.log(this.tokenString);
    });
  }
}
