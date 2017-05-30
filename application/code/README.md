## resources
1. Loopback documentation: http://loopback.io/doc/en/lb3/index.html
    1. supports offline/online syncing http://loopback.io/doc/en/lb3/Synchronization.html
    1. supports push notification http://loopback.io/doc/en/lb3/Push-notifications.html
    1. supports eventing 
    1. supports oauth http://loopback.io/doc/en/lb3/OAuth-2.0.html
    1. supports passport/social login http://loopback.io/doc/en/lb3/Third-party-login-using-Passport.html
    1. supports transport agnostic pub sub http://loopback.io/doc/en/lb3/Publish-subscribe-messaging.html
    1. supports various database impls http://loopback.io/doc/en/lb3/Connectors-reference.html
        1. including mongo and couchbase
    1. built in ROLES/ACL http://loopback.io/doc/en/lb3/Adding-remote-methods-to-built-in-models.html
        
    1. will auto create REST services from a schema (I have a version of BIS REST services based on a dev database)
        1.  might be a cheap 'put data back into BIS from our services' cut-in point
1. Angular client generator for loopback server: https://github.com/mean-expert-official/loopback-sdk-builder


#Setup

* install docker
* nvm/node - (alternative, install 7.7.4 manually)
    * install nvm
    * nvm install 7.7.4
    * nvm use 7.7.4
* npm install gulp ('npm install -g gulp')
* install loopback ('npm install -g strongloop')

# Server

## initialize your environment
1. you must do this for any terminal you open
1. open a terminal window
1. cd this project/application/code
1. edit ./bin/required-settings.sh (follow comments in file)
1. source ./bin/init.sh

## initialize the server
1. cd application/code
1. npm install

## run the server
1. cd application/code
1. gulp run

TODO: hook up latest ng-cli

## verify server is working, server resources
1. load http://127.0.0.1:3002/status (you can also use localhost)
1. auto generated swagger REST UI http://127.0.0.1:3002/explorer
1. out-of-the-box features
    1. filtering examples
        1. query by where
            1. http://127.0.0.1:3002/api/addresses?filter[where][state][like]=TX
        1. paging
            1. http://127.0.0.1:3002/api/addresses?filter[limit]=1
            1. http://127.0.0.1:3002/api/addresses?filter[limit]=1&filter[skip]=1
        1. field inclusion/suppresion
            1. http://127.0.0.1:3002/api/addresses?filter[fields][id]=true&filter[fields][state]=true
        1.  ordering data
            1. http://127.0.0.1:3002/api/addresses?filter[createdAt][0]=id%20ASC&filter[updatedAt][1]=updatedAt%20ASC
        1. docs http://loopback.io/doc/en/lb3/Querying-data.html
1. REST api http://127.0.0.1:3002/api
1. health status http://127.0.0.1:3002/status

## other information for server

### verify mongo is running
1. open browser to http://localhost:28017/

### see available gulp commands
1. cd application/code
1. gulp

### expert level - see bundled bash utils commands
1. cd application/code
1. rerun<enter>

### rerun example
1. rerun mongo 
1. will show all bundled bash mongo commands
1. rerun mongo:is-running will check to see if mongo is running
1. you can bind rerun commands to gulp if/when needed

### re-generate the angular client library for your api

1. cd application/code
1. gulp angularGenClient
1. NOTE: will prompt if client lib already exists (press Y to overwrite)

### running tests and coverage
1. cd application/code
1. gulp test

### see coverage reports
1. cd application/code
1. gulp test-report


### setting up email (optional for password reset)
1. open server/datasources.development.js and copy email config to a new file: server/datasources.local.js
1. update user, pass (and port/server if needed - this is the hotmail config by default)

----

# Client

## initialize your environment 
1. follow setps in 'server' initialize your environment (above)

## run the client
1. cd application/code
1. gulp angularGenClient
1. cd client
1. npm install 
1. npm start
1. navigate to http://localhost:3000/

## client functionality
1. Login
     1. go to http://localhost:3000/login (use admin@admin.com / admin to login)
     1. src/app/login.component.ts
     1. src/app/login.component.html
1. Login Menu (top left of screen, displays curent user and logout or signup/login)
     1. src/app/login-menu.component.ts
     1. src/app/login-menu.component.html
1. Signup
     1. http://localhost:3000/signup
1. Reset password - IN PROGRESS
     1. http://localhost:3000/resetPasswordRequest - to reset password 
1. generated angular client code in client/app/shared/angular-client

## resources

1. RXJS docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
1. Angular 2 Client generator: https://github.com/mean-expert-official/loopback-sdk-builder

----
# Troubleshooting

## jquery not found
npm install --save jquery
npm install -D @types/jquery

### alternate
npm install -g typings --save
typings install dt~jquery --global --save

