var React = require('react'),
    RoutePlan = require('./route-plan'),
    Map = require('./map'),
    Route = require('../models/route'),
    WayPoints = require('../models/way-points');


var Application = React.createClass({
    getInitialState: function () {
        return {
            route: new Route({
                name: 'Weekend drive',
                wayPoints: new WayPoints([
                    {name: 'San Francisco, CA'},
                    {name: 'Fremont, CA'},
                    {name: 'San Jose, CA'}
                ])
            })
        };
    },
    componentDidMount: function () {
    },
    render: function () {
        var mapService = this.props.mapService,
            route = this.state.route;
        return (
            <div>
                <Map mapService={mapService} route={route}/>
                <RoutePlan mapService={mapService} route={route} />
            </div>
            );
    }
});

module.exports = Application;