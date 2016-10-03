var React = require('react');
var WayPoint = require('./way-point');

class WayPoints extends React.Component {


    render() {
        return (
            <ul className='way-points'>
                {
                    this.props.wayPoints.map((wp) => {
                        return (
                            <li key={wp.id}>
                                <WayPoint
                                    name={wp.name}
                                    onAdd={this.props.onAdd.bind(wp.id)}
                                    onRemove={this.props.onRemove.bind(wp.id)}
                                />
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

module.exports = WayPoints;