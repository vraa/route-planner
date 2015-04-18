var React = require('react'),
    RouteName = require('./route-name'),
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
        this.props.route.get('wayPoints').on('remove change', this.updateWayPoints);
    },
    componentWillUnmount: function () {
        vent.off('map:route:distance:update');
    },
    updateRouteDistance: function (response) {
        var mapRoutes = response.routes,
            wayPoints = this.props.route.get('wayPoints'),
            routeLegs,
            i;
        if (mapRoutes && mapRoutes.length > 0) {
            routeLegs = mapRoutes[0].legs;
            for (i = 0; i < routeLegs.length; i++) {
                wayPoints.at(i + 1).set({
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
        var wayPoints = this.props.route.get('wayPoints');
        wayPoints.at(index).set({
            name: value
        });
        this.setState({
            editingAt: -1
        });
    },
    addWayPoint: function (index) {
        var wayPoints = this.props.route.get('wayPoints');
        wayPoints.add(new WayPointModel(), {at: index + 1});
        this.setState({
            editingAt: index + 1
        });
    },
    removeWayPoint: function (index) {
        var wayPoints = this.props.route.get('wayPoints');
        if (wayPoints.length > 2) {
            wayPoints.remove(wayPoints.at(index));
            this.setState({
                editingAt: -1
            });
        } else {
            alert('Sorry. You need at least two destinations in here.');
        }
    },
    updateWayPoints: function () {
        vent.trigger('map:route:way-points:update', this.props.route.get('wayPoints'));
    },
    render: function () {
        var route = this.props.route,
            wayPoints = route.get('wayPoints'),
            self = this,
            wayPointsElm = wayPoints.map(function (wayPoint, index) {
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
                <RouteName route={route}/>
                <Dashboard route={route}/>
                <div ref='wayPoints' className='way-points'>
                    {wayPointsElm}
                </div>
            </div>
            );
    }
});

module.exports = RoutePlan;