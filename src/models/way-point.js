var Backbone = require('backbone');

var WayPoint = Backbone.Model.extend({
    defaults: {
        name: '',
        lat: 0,
        lng: 0
    }
});

module.exports = WayPoint;