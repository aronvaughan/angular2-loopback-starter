import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

/**
 * default pattern for services to use to handle results from an observable call and must pass
 * back an observable to a caller for updates
 */
export class ServiceSubscriberUtility {

  constructor(protected service: any) {

  }

  subscribe(observable : Observable<any>): Subject<any> {
    var subject: Subject<any> = new Subject<any>();
    observable.subscribe(this.getDataClosure(subject), this.getErrorClosure(subject), this.getCompleteClosure(subject));
    return subject;
  }

  getDataClosure(subject: Subject<any>) {
    return data => {
      console.log(this.service.constructor.name, '!!!! service got data, passing on to subscribers!!!!', data);
      subject.next(data);
    };
  }

  /**
   * handle error returned from our service call
   * updates the component error message to display the error to the user
   * @returns {(error?:any)=>undefined}
   */
  getErrorClosure(subject: Subject<any>) {
    return error => {
      console.log(this.service.constructor.name, '!!!! service got error!!!!', error);
      subject.error(error);
    };
  }

  getCompleteClosure(subject: Subject<any>) {
    return () => {
      console.log(this.service.constructor.name, '!!!! service got complete!!!!');
      subject.complete();
    };
  }

}
