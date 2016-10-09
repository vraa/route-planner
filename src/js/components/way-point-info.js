var React = require('react');

class WayPointInfo extends React.Component {

    render() {
        return (
            <div className="way-point-info">
                <span className="distance">{this.props.distance}</span>
                <span className="duration">{this.props.duration}</span>
            </div>
        )
    }

}

module.exports = WayPointInfo;