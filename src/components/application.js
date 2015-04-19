var React = require('react'),
    vent = require('../util/vent'),
    RouteTabs = require('./route-tabs'),
    RoutePlan = require('./route-plan'),
    Map = require('./map'),
    Routes = require('../models/routes'),
    Route = require('../models/route'),
    WayPoints = require('../models/way-points'),
    SeedData = require('../util/seed-data');


var Application = React.createClass({
    getInitialState: function () {
        return {
            routes: SeedData.routes,
            activeRoute: 0
        };
    },
    componentDidMount: function () {
        this.state.routes.on('remove change', this.updateRouteWayPoints);
    },
    onAction: function (action, value) {
        switch (action) {
            case 'change-name':
                this.onRouteNameChange(value);
                break;
            case 'remove':
                this.onRouteRemove();
                break;
        }
    },
    onRouteAdd: function () {
        var routes = this.state.routes;
        routes.add(SeedData.newRoute());
        this.setState({
            activeRoute: routes.length - 1
        });
    },
    onRouteSwitch: function (routeIndex) {
        this.setState({
            activeRoute: routeIndex
        }, function () {
            vent.trigger('map:route:way-points:update');
        });
    },
    onRouteNameChange: function (value) {
        var route = this.state.routes.at(this.state.activeRoute);
        route.set('name', value);
        this.setState({
            routeUpdated: new Date().getTime()
        });
    },
    onRouteRemove: function () {
        var routes = this.state.routes;
        routes.remove(routes.at(this.state.activeRoute), {silent: true});
        if (routes.length === 0) {
            this.onRouteAdd();
        } else {
            if (this.state.activeRoute > 0) {
                this.setState({
                    activeRoute: this.state.activeRoute - 1
                });
            } else {
                this.setState({
                    activeRoute: 0
                });
            }
        }
    },
    updateRouteWayPoints: function () {
        vent.trigger('map:route:way-points:update');
    },
    render: function () {
        var mapService = this.props.mapService,
            route = this.state.routes.at(this.state.activeRoute);
        return (
            <div>
                <Map mapService={mapService} route={route}/>
                <div className='route-planner'>
                    <RouteTabs
                    onAdd={this.onRouteAdd}
                    onSwitch={this.onRouteSwitch}
                    routes={this.state.routes}
                    active={this.state.activeRoute}
                    />
                    <RoutePlan mapService={mapService} route={route} routeAction={this.onAction} />
                </div>
            </div>
            );
    }
});

module.exports = Application;