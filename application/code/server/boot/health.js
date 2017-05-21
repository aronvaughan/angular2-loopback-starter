module.exports = function (app) {
    var Health = app.models.Health;
    Health.create({
        dbCheck: true
    }, function (err, healthInstance) {
        console.log(healthInstance);
    });
};
