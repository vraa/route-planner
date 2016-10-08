var React = require('react');
var WayPoint = require('./way-point');

class WayPoints extends React.Component {


    renderWayPoints() {
        return (
            <ul className='way-points'>
                {
                    this.props.wayPoints.map((wp) => {
                        return (
                            <li key={wp.id}>
                                <WayPoint
                                    id={wp.id}
                                    name={wp.name}
                                    onAdd={this.props.onAdd.bind(this, wp.id)}
                                    onRemove={this.props.onRemove.bind(this, wp.id)}
                                />
                            </li>
                        )
                    })
                }
            </ul>
        )
    }


    render() {
        var elm;
        if (this.props.wayPoints.length > 0) {
            elm = this.renderWayPoints();
        } else {
            elm = <button onClick={this.props.onAdd.bind(this, 0)}>Add Way Point</button>
        }
        return (
            <div className="way-points">
                {elm}
            </div>
        )
    }
}

module.exports = WayPoints;