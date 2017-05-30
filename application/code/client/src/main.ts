import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import * as io from 'socket.io-client';
console.dir( io );

//import jquery
import 'jquery';

platformBrowserDynamic().bootstrapModule(AppModule);
