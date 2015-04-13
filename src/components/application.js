var React = require('react'),
    RoutePlan = require('./route-plan'),
    Map = require('./map'),
    Route = require('../models/route');


var Application = React.createClass({
    getInitialState: function () {
        return {
            route: new Route([
                {name: 'San Francisco, CA'},
                {name: 'Fremont, CA'},
                {name: 'San Jose, CA'}
            ])
        };
    },
    componentDidMount: function () {
    },
    render: function () {
        var mapService = this.props.mapService,
            route = this.state.route;
        return (
            <div>
                <Map service={mapService} route={route}/>
                <RoutePlan route={route}/>
            </div>
            );
    }
});

module.exports = Application;