var React = require('react'),
    Dashboard = require('./dashboard'),
    WayPoint = require('./way-point'),
    RouteInfo = require('./route-info'),
    WayPointModel = require('../models/way-point'),
    vent = require('../util/vent');

var RoutePlan = React.createClass({
    getInitialState: function () {
        return ({
            editingAt: -1
        });
    },
    componentDidMount: function () {
        vent.on('map:route:distance:update', this.updateRouteDistance, this);
        this.props.route.on('remove change', this.updateRoutes);
    },
    componentWillUnmount: function () {
        vent.off('map:route:distance:update');
    },
    updateRouteDistance: function (response) {
        var mapRoutes = response.routes,
            route = this.props.route,
            routeLegs,
            i;
        if (mapRoutes && mapRoutes.length > 0) {
            routeLegs = mapRoutes[0].legs;
            for (i = 0; i < routeLegs.length; i++) {
                route.at(i + 1).set({
                    distance: routeLegs[i].distance,
                    duration: routeLegs[i].duration
                });
            }
            this.setState({
                routeUpdated: new Date().getTime()
            });
        }
    },
    onAction: function (index, action, options) {
        switch (action) {
            case 'edit':
                this.editWayPoint(index);
                break;
            case 'save':
                this.saveWayPoint(index, options.value);
                break;
            case 'remove':
                this.removeWayPoint(index);
                break;
            case 'add':
                this.addWayPoint(index);
                break;
            case 'cancel':
                this.cancel(index);
        }
    },
    editWayPoint: function (index) {
        this.setState({
            editingAt: index
        });
    },
    saveWayPoint: function (index, value) {
        var route = this.props.route;
        route.at(index).set({
            name: value
        });
        this.setState({
            editingAt: -1
        });
    },
    addWayPoint: function (index) {
        var route = this.props.route;
        route.add(new WayPointModel(), {at: index + 1});
        this.setState({
            editingAt: index + 1
        });
    },
    removeWayPoint: function (index) {
        var route = this.props.route;
        if (route.length > 2) {
            route.remove(route.at(index));
            this.setState({
                editingAt: -1
            });
        } else {
            alert('Sorry. You need at least two destinations in here.');
        }
    },
    updateRoutes: function () {
        vent.trigger('map:route:update', this.props.route);
    },
    render: function () {
        var route = this.props.route,
            self = this,
            wayPoints = route.map(function (wayPoint, index) {
                var key = 'wayPoint' + index,
                    routeInfo = index === 0 ? null : <RouteInfo wayPoint={wayPoint}/>;

                return (
                    <div key={key}>
                    {routeInfo}
                        <WayPoint
                        mapService={self.props.mapService}
                        wayPoint={wayPoint}
                        editing={self.state.editingAt === index}
                        onAction={self.onAction.bind(self, index)}
                        />
                    </div>
                    );
            });
        return (
            <div className='route-plan'>
                <Dashboard route={route}/>
                <div ref='wayPoints' className='way-points'>
                    {wayPoints}
                </div>
            </div>
            );
    }
});

module.exports = RoutePlan;