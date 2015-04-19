var Routes = require('../models/routes'),
    Route = require('../models/route'),
    WayPoints = require('../models/way-points'),
    routes,
    route;

routes = new Routes();
route = new Route({
    name: 'Weekend drive',
    wayPoints: new WayPoints([
        {name: 'San Francisco, CA'},
        {name: 'Half moon bay, CA'},
        {name: 'Santa Cruz, CA'},
        {name: 'Monterey, CA'}
    ])
});

routes.add(route);
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




