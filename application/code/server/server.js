'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

console.log('===========================');
console.log('ENV: ' + process.env.NODE_ENV);
console.log('APPLICATION: ' + process.env.LOOPBACK_PROJECT_NAME);
console.log('DATABASE: ' + process.env.LOOPBACK_PROJECT_NAME + '_db');
console.log('Mongo url: ' + process.env.DB_HOST + ':' + process.env.DB_PORT);
console.log('===========================');

var setupLogging = function() {
  console.log('setting up logging of requeset and response');

  //Sample # 2 - bit more advanced
// Also helps track reponse time for all URLs
  app.middleware('initial', function logResponse(req, res, next) {
    // http://www.senchalabs.org/connect/responseTime.html
    var start = new Date;
    if (res._responseTime) {
      return next();
    }
    res._responseTime = true;

    // install a listener for when the response is finished
    res.on('finish', function() { // the request was handled, print the log entry
      var duration = new Date - start;
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log(req.method, req.originalUrl, res.statusCode, duration + 'ms', {
        lbHttpMethod:req.method,
        lbUrl:req.originalUrl,
        lbStatusCode:res.statusCode,
        lbResponseTime:duration,
        body: req.body
      });
      console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    });

    // resume the routing pipeline,
    // let other middleware to actually handle the request
    next();
  });
};
setupLogging();


app.start = function () {
    // start the web server
    /* istanbul ignore next */
    return app.listen(function () {
        app.emit('started');
        var baseUrl = app.get('url').replace(/\/$/, '');

        console.log('Web server listening at: %s', baseUrl);
        if (app.get('loopback-component-explorer')) {
            var explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
        }
        console.log('Web server status at /status');
    });
};

/*
var enableCORS = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};

// enable CORS!
app.use(enableCORS);
*/

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
    /* istanbul ignore next */
    if (err) {
        throw err;
    }

    // start the server if `$ node server.js`
    /* istanbul ignore next */
    if (require.main === module) {
        //app.start();

      //using socket.io
      //Comment this app.start line and add following lines
      //app.start();
      app.io = require('socket.io')(app.start());
      require('socketio-auth')(app.io, {
        authenticate: function (socket, value, callback) {

          var AccessToken = app.models.AccessToken;
          //get credentials sent by the client
          var token = AccessToken.find({
            where:{
              and: [{ userId: value.userId }, { id: value.id }]
            }
          }, function(err, tokenDetail){
            if (err) throw err;
            if(tokenDetail.length){
              callback(null, true);
            } else {
              callback(null, false);
            }
          }); //find function..
        } //authenticate function..
      });

      app.io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('disconnect', function(){
          console.log('user disconnected');
        });
      });
    }
});
