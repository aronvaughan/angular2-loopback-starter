module.exports = function (Model, options) {
    Model.defineProperty('id', {
        type: 'string',
        defaultFn: 'uuid',
        id: true
    });
};
