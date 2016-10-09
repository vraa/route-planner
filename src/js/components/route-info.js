var React = require('react');

class RouteInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    renderDistance(distance = {text:'0'}) {
        return (
            <div className="distance">
                <p>{distance.text}</p>
            </div>
        )
    }

    renderDuration(duration = {text:'0'}) {
        return (
            <div className="duration">
                <p>{duration.text}</p>
            </div>
        )
    }

    render() {
        let directions = this.props.route.directions;
        let distance, duration, direction, legs, leg;
        if (directions) {
            direction = directions[0];
            legs = direction.legs;
            leg = legs[0];

            distance = leg.distance;
            duration = leg.duration;
        }
        return (
            <div className="route-info">
                {this.renderDistance(distance)}
                {this.renderDuration(duration)}
            </div>
        )
    }
}

module.exports = RouteInfo;