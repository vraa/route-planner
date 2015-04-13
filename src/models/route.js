var Backbone = require('backbone'),
    WayPoint = require('./way-point');

var Route = Backbone.Collection.extend({
    model: WayPoint
});

module.exports = Route;