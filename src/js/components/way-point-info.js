var React = require('react');

class WayPointInfo extends React.Component {

    render() {
        return (
            <div className="way-point-info">
                <span className="distance"><i className="icon-directions_car"/> {this.props.distance}</span>
                <span className="duration"><i className="icon-clock"/> {this.props.duration}</span>
            </div>
        )
    }

}

module.exports = WayPointInfo;