var React = require('react'),
    vent = require('../util/vent');

var directionsDisplay,
    directionsService,
    DEFAULT_LOCATION;

var Map = React.createClass({

    componentDidMount: function () {
        var google = this.props.mapService;
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();
        DEFAULT_LOCATION = new google.maps.LatLng(13.0827, 80.2707);
        this.renderMap({
            zoom: 7,
            center: DEFAULT_LOCATION
        });

        vent.on('map:route:way-points:update', this.updateWayPoints, this);
        this.updateWayPoints();
    },
    updateDistanceData: function (response) {
        vent.trigger('map:route:distance:update', response);
    },
    updateWayPoints: function () {
        var wayPoints = this.props.route.get('wayPoints'),
            google = this.props.mapService,
            request = {
                origin: wayPoints.at(0).get('name'),
                destination: wayPoints.at(wayPoints.length - 1).get('name'),
                travelMode: google.maps.TravelMode.DRIVING
            },
            wayPointsList = [],
            i,
            noOfWayPoints = wayPoints.length - 2,
            self = this;

        if (noOfWayPoints > 0) {
            for (i = 1; i <= noOfWayPoints; i++) {
                wayPointsList.push({
                    location: wayPoints.at(i).get('name')
                });
            }
            request.waypoints = wayPointsList;
        }

        directionsService.route(request, function (response, status) {
            if (status === 'OK') {
                self.updateDistanceData(response);
                directionsDisplay.setDirections(response);
            }
        });
    },
    renderMap: function (mapOptions) {
        var google = this.props.mapService,
            mapCanvas = document.getElementById('map'),
            vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        mapCanvas.style.height = vH + 'px';
        this.map = new google.maps.Map(mapCanvas, mapOptions);
        directionsDisplay.setMap(this.map);

    },
    render: function () {
        return (
            <div id='map' className='route-map'></div>
            );
    }
});

module.exports = Map;