import {Component, AfterContentChecked, OnInit, Inject} from '@angular/core';

import {WindowRef} from './shared/utility/windowref';



@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit /*, AfterContentChecked */ {
  name = 'Angular';
  title = 'Tour of Heroes';
  loaded = false;

  windowRef: WindowRef = undefined;

  constructor(windowRef: WindowRef) {
    this.windowRef = windowRef;
  }

  ngOnInit() {
    console.log("app ng on init called, initializing jquery");

    let jquery: JQuery;

    var self = this;

    if (!this.loaded) {
      jQuery.getScript('../assets/js/script.js', function (data, textStatus, jqxhr) {
        //self.loaded = true;
        //console.log( "data", data ); // Data returned
        //console.log( "textStatus", textStatus ); // Success
        // console.log( "jqxhr status", jqxhr.status ); // 200
        console.log( "jquery init function load was performed." );
        self.windowRef.nativeWindow.initFunction();
      }).done(function (script, textStatus) {
        console.log("done", textStatus);
      }).fail(function (jqxhr, settings, exception) {
        console.log("failed", exception);
      });
    };
    this.loaded = true;
  }

  /*
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked()');

  }*/

}


