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

        vent.on('map:route:update', this.updateRoute, this);
        this.updateRoute(this.props.route);
    },
    updateDistanceData: function (response) {
        vent.trigger('map:route:distance:update', response);
    },
    updateRoute: function (route) {
        var google = this.props.service,
            request = {
                origin: route.at(0).get('name'),
                destination: route.at(route.length - 1).get('name'),
                travelMode: google.maps.TravelMode.DRIVING
            },
            wayPoints = [],
            i,
            noOfWayPoints = route.length - 2,
            self = this;

        if (noOfWayPoints > 0) {
            for (i = 1; i <= noOfWayPoints; i++) {
                wayPoints.push({
                    location: route.at(i).get('name')
                });
            }
            request.waypoints = wayPoints;
        }

        directionsService.route(request, function (response, status) {
            self.updateDistanceData(response);
            directionsDisplay.setDirections(response);
        });
    },
    renderMap: function (mapOptions) {
        var google = this.props.service,
            mapCanvas = document.getElementById('map'),
            map,
            vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        mapCanvas.style.height = vH + 'px';
        map = new google.maps.Map(mapCanvas, mapOptions);
        directionsDisplay.setMap(map);

    },
    render: function () {
        return (
            <div id='map' className='map'></div>
            );
    }
});

module.exports = Map;