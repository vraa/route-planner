var Routes = require('../models/routes'),
    Route = require('../models/route'),
    WayPoints = require('../models/way-points'),
    routes,
    route;

routes = new Routes();
routes.add(new Route({
    name: 'Weekend drive',
    wayPoints: new WayPoints([
        {name: 'San Francisco, CA', placeId: 'ChIJIQBpAG2ahYAR_6128GcTUEo'},
        {name: 'Half moon bay, CA', placeId: 'ChIJC8sZCqULj4ARVJvnNcic_V4'},
        {name: 'Santa Cruz, CA', placeId: 'ChIJSdU2fBtEjoARhfnXKksQylI'}
    ])
}));
routes.add(new Route({
    name: 'Cross country trip',
    wayPoints: new WayPoints([
        {name: 'San Francisco, CA'},
        {name: 'Los Angeles, CA'},
        {name: 'Las Vegas, CA'},
        {name: 'Austin, TX'},
        {name: 'Miami, FL'}
    ])
}));

function newRoute() {
    return new Route({
        name: 'Route name',
        wayPoints: new WayPoints([
            {name: 'Start'},
            {name: 'End'}
        ])
    });
}

module.exports = {
    routes: routes,
    newRoute: newRoute
};




