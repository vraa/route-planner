var React = require('react');
var ReactDOM = require('react-dom');

class Map extends React.Component {

    componentDidMount() {
        this.initMap(ReactDOM.findDOMNode(this));
    }

    componentWillReceiveProps(nextProps) {
        if (this.directionsDisplay !== undefined && nextProps.mapData !== undefined) {
            this.directionsDisplay.setDirections(nextProps.mapData);
        }
    }

    initMap(elm) {
        if (!!elm && !this.map) {
            let google = this.props.mapService;
            this.directionsDisplay = new google.maps.DirectionsRenderer;
            this.map = new google.maps.Map(elm, {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            });
            this.directionsDisplay.setMap(this.map);
        }
    }

    render() {
        return (
            <div className="map" id="map">
            </div>
        )
    }
}

module.exports = Map;