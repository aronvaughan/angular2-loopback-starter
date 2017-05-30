import {Observable} from "rxjs";
import {BaseComponent} from "../../base.component";

/**
 * default pattern for components to use to handle results from our service calls
 * the service calls return observables
 */
export class ComponentSubscriberUtility {

  constructor(protected baseComponent: BaseComponent) {

  }

  subscribe(observable : Observable<any>): any {
    observable.subscribe(this.getDataClosure(), this.getErrorClosure(), this.getCompleteClosure());
  }

  getDataClosure() : any {
    return data => {
      console.log(this.baseComponent.constructor.name, '!!!! got data!!!!', data);
    };
  }

  /**
   * handle error returned from our service call
   * updates the component error message to display the error to the user
   * @returns {(error?:any)=>undefined}
   */
  getErrorClosure() : any {
    return error => {
      console.log(this.baseComponent.constructor.name, '!!!! got error!!!!', error);
      this.baseComponent.setErrorMessage(error.message);
    };
  }

  getCompleteClosure() : any {
    return () => {console.log(this.baseComponent.constructor.name, '!!!! got complete!!!!');};
  }
}
