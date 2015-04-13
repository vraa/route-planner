var React = require('react'),
    RoutePlan = require('./route-plan'),
    Map = require('./map'),
    Route = require('../models/route');


var Application = React.createClass({
    getInitialState: function () {
        return {
            route: new Route([
                {name: 'Chennai'},
                {name: 'Bangalore'}
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
                <RoutePlan route={route}/>
            </div>
            );
    }
});

module.exports = Application;