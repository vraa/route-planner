var React = require('react'),
    Header = require('./header'),
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
                <Header/>
                <div className='route-map-container'>
                    <RoutePlan route={route}/>
                </div>
            </div>
            );
    }
});

module.exports = Application;