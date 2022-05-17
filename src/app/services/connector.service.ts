import { Injectable } from '@angular/core';
import { ShellSdk, SHELL_EVENTS } from 'fsm-shell';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  
  private SHELL_SDK: any;
  private message = '';
  private isInitialized: boolean = false;

  constructor() { 
    if (!ShellSdk.isInsideShell()) {
      this.message = 'unable to reach shell eventAPI';
      console.log(this.message);
      this.isInitialized = false;
    } else {
      this.SHELL_SDK = ShellSdk.init(parent, '*');
      this.isInitialized = true;
    }
  }

  getPromise(client_id: string, requestedData: Object): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (!this.SHELL_SDK) {
        reject('App is not running inside shell');
        return;
      }
      this.connect(client_id);
      
      this.SHELL_SDK.on(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, (context:string) =>{
        resolve(requestedData = JSON.parse(context));
      });
    });

    return promise;

  }

  connect(client_id: string) {
    if(this.isInitialized) {
      this.SHELL_SDK.emit(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, {
        clientIdentifier: client_id,
        auth: {
          response_type: 'token'
        }
      });
    }
  }
 }
