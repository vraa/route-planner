var React = require('react'),
    vent = require('../util/vent'),
    Header = require('./header'),
    RouteTabs = require('./route-tabs'),
    RoutePlan = require('./route-plan'),
    Map = require('./map'),
    Place = require('./place'),
    RouteCollection = require('../models/routes'),
    RouteModel = require('../models/route'),
    WayPoints = require('../models/way-points'),
    SeedData = require('../util/seed-data');


var Application = React.createClass({
    getInitialState: function () {
        return {
            routes: this.load() || SeedData.routes,
            activeRoute: 0,
            selectedPlace: null
        };
    },
    componentDidMount: function () {
        vent.trigger('map:places:refresh');
        this.state.routes.on('remove change', this.updateRouteWayPoints);
        vent.on('app:save', this.save, this);
        vent.on('place:select', this.onSelectPlace, this);
        vent.on('place:close', this.onClosePlace, this);
    },
    onSelectPlace: function (place) {
        this.setState({
            selectedPlace: place
        });
    },
    onClosePlace: function () {
        this.setState({
            selectedPlace: null
        });
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
        this.save();
        this.setState({
            routeUpdated: new Date().getTime()
        });
    },
    onRouteAdd: function () {
        var routes = this.state.routes;
        routes.add(SeedData.newRoute());
        this.save();
        this.setState({
            activeRoute: routes.length - 1
        });
    },
    onRouteRemove: function () {
        var routes = this.state.routes;
        routes.remove(routes.at(this.state.activeRoute), {silent: true});
        this.save();
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
    load: function () {
        var saved = localStorage.getItem('routes'),
            routes = null;
        if (!!saved) {
            saved = JSON.parse(saved);
            routes = new RouteCollection();
            saved.map(function (route) {
                var route = new RouteModel({
                    name: route.name,
                    wayPoints: new WayPoints(route.wayPoints)
                });
                routes.add(route, {silent: true});
            });
        }
        return routes;
    },
    save: function () {
        localStorage.setItem('routes', JSON.stringify(this.state.routes.toJSON()));
    },
    render: function () {
        var mapService = this.props.mapService,
            route = this.state.routes.at(this.state.activeRoute);
        return (

            <div className='route-planner'>
                <Header/>
                <RouteTabs
                onAdd={this.onRouteAdd}
                onSwitch={this.onRouteSwitch}
                routes={this.state.routes}
                active={this.state.activeRoute}
                />
                <RoutePlan mapService={mapService} route={route} routeAction={this.onAction} />
                <Map mapService={mapService} route={route}/>
            </div>
            );
    }
});

module.exports = Application;