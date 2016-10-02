var React = require('react');

class WayPoint extends React.Component {

    render() {
        return (
            <p className="way-point">{this.props.name}</p>
        )
    }
}

module.exports = WayPoint;