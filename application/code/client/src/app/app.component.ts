import {Component, AfterContentChecked, OnInit, Inject} from '@angular/core';

import {WindowRef} from './shared/utility/windowref';
//import 'jquery';
//import * as $ from 'jquery';

//declare  var jquery:any;
//declare var $:any;

declare var $:JQueryStatic;

//var jQuery:JQueryStatic = tester;
//var jQuery:JQueryStatic = tester;
//declare var dork:JQueryStatic;
//var jQuery:any = tester;
//let $ = require('../../node_modules/jquery/dist/jquery.min.js');

//in angular-cli.json scripts: /*"../node_modules/jquery/dist/jquery.min.js"*/

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

    //let jquery: $;
    //var jquery: JQueryStatic;
    //var jquery = tester();

    var self = this;
    //console.log('jquery', jquery);
    console.log('tester', $);
    //console.log('JQuery', jQuery);
    //console.log('dork', dork);

    /*
    if (!this.loaded) {
      $.getScript('../assets/js/script.js', function (data, textStatus, jqxhr) {
        //self.loaded = true;
        //console.log( "data", data ); // Data returned
        //console.log( "textStatus", textStatus ); // Success
        // console.log( "jqxhr status", jqxhr.status ); // 200
        console.log( "jquery init function load was performed." );
        //console.log('window', $(window));
        //console.log('window2', self.windowRef.nativeWindow);

        self.windowRef.nativeWindow.initFunction();

      }).done(function (script, textStatus) {
        console.log("done", textStatus);
      }).fail(function (jqxhr, settings, exception) {
        console.log("failed", exception);
      });
    };
    */
    this.loaded = true;
  }

}


