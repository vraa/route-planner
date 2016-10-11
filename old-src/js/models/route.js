var Backbone = require('backbone'),
    WayPoints = require('./way-points');

var Route = Backbone.Model.extend({
    defaults: {
        name: 'Route',
        wayPoints: new WayPoints()
    }
});

module.exports = Route;