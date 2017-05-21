var expect = require('chai').expect;
var app = require('../../../server/server');
var supertest = require('supertest');
var api = supertest.agent('http://localhost:3000');
// var LogFactory = require('../../../server/util/LogFactory');


describe('Health Test', function () {

    // var server;

    // var logger = LogFactory.getLogger('TEST');
    before(function (done) {
        console.log('before');
        server = app.listen(done);
        // require('../../start-server')(done);
        // done();
    });

    after(function (done) {
        console.log('after');
        app.removeAllListeners('started');
        app.removeAllListeners('loaded');
        server.close(done);
        // done();
    });

    it('should return an object from the database', function (done) {

        // var values = ContactPreferenceType.values();
        // expect(values).to.not.equal(undefined);
        // logger.debug('value', values);
        // expect(values.length).to.equal(3);
        api
            .get('/api/health')
            .expect('Content-type',/json/)
            .expect(200) // THis is HTTP response
            .end(function (err,res){

                if (err) {
                    console.log('ERROR', err);
                }
                console.log('result ', res.body);

                // HTTP status should be 200
                expect(res.status).to.equal(200);

                expect(res.body.length).to.equal(1);

                // Error key should be false.
                // res.body.error.should.equal(false);
                done();
            });
    });
});
