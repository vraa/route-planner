var React = require('react');


var Application = React.createClass({
    componentDidMount: function () {
        var google = this.props.google,
            directionsDisplay = new google.maps.DirectionsRenderer(),
            chicago = new google.maps.LatLng(41.850033, -87.6500523),
            mapOptions = {
                zoom: 7,
                center: chicago
            },
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
        directionsDisplay.setMap(map);


    },
    render: function () {
        var google = this.props.google;
        return (
            <h1>Hello World</h1>
            );
    }
});

module.exports = Application;