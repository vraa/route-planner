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
        {name: 'Fremont, CA'},
        {name: 'San Jose, CA'}
    ])
});

routes.add(route);
routes.add(new Route({
    name: 'Weekend drive',
    wayPoints: new WayPoints([
        {name: 'Start'},
        {name: 'End'}
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




