module.exports = function (server) {
    // Install a `/` route that returns server status
    var router = server.loopback.Router();

    // install status routs
    router.get('/uptime', server.loopback.status());
    router.get('/status', function (req, res) {

        var statusInfo = {
            // see config.json
            application: server.get('applicationName'),
            running: true
        };
        res.json(statusInfo);
    });

    server.use(router);
};
