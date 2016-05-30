var Backbone = require('backbone'),
    WayPoint = require('./way-point');

var WayPoints = Backbone.Collection.extend({
    model: WayPoint
});

module.exports = WayPoints;