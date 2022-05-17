import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../services/connector.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  CLIENT_ID: string = 'angextension';

  requestedData = {
    account: null,
    accountId: null,
    company: null,
    companyId: null,
    user: null,
    userId: null,
    selectedLocale: null
  }

  constructor(private connector: ConnectorService) { }

  ngOnInit(): void {
    let promise = this.connector.getPromise(this.CLIENT_ID, this.requestedData);
    promise.then((value) => {
      this.requestedData = value;
      
    });
    promise.catch((error) => {
      console.log(error);
    })

  }

}
