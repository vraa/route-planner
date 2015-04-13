var React = require('react'),
    Header = require('./header'),
    RoutePlan = require('./route-plan'),
    Map = require('./map');


var Application = React.createClass({
    componentDidMount: function () {
    },
    render: function () {
        var mapService = this.props.mapService;
        return (
            <div>
                <Header/>
                <div className='route-map-container'>
                    <RoutePlan/>
                    <Map service={mapService} />
                </div>
            </div>
            );
    }
});

module.exports = Application;