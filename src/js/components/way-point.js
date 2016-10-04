var React = require('react');

class WayPoint extends React.Component {

    render() {
        return (
            <div className="way-point">
                <p>{this.props.name }</p>
                <button onClick={this.props.onAdd}>add</button>
                <button onClick={this.props.onRemove}>delete</button>
            </div>
        )
    }
}

module.exports = WayPoint;