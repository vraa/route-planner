var Backbone = require('backbone'),
    Route = require('./route');

var Routes = Backbone.Collection.extend({
    model : Route
});

module.exports = Routes;