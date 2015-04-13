var React = require('react'),
    vent = require('../util/vent');

var directionsDisplay,
    directionsService,
    DEFAULT_LOCATION;

var Map = React.createClass({

    componentDidMount: function () {
        var google = this.props.service;
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();
        DEFAULT_LOCATION = new google.maps.LatLng(13.0827, 80.2707);
        this.renderMap({
            zoom: 7,
            center: DEFAULT_LOCATION
        });

        vent.on('map:directions:update', this.updateDirections, this);
    },
    updateDirections: function () {
        console.log('updating directions');
        var google = this.props.service,
            start = 'Chennai, IN',
            end = 'Bangalore, IN',
            request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };

        directionsService.route(request, function (response, status) {
            console.log(status);
            directionsDisplay.setDirections(response);
        });
    },
    renderMap: function (mapOptions) {
        var google = this.props.service,
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
        directionsDisplay.setMap(map);

    },
    render: function () {
        return (
            <div id='map' className='map'></div>
            );
    }
});

module.exports = Map;