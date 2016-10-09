var React = require('react');
var WayPoint = require('./way-point');
var WayPointInfo = require('./way-point-info');

class WayPoints extends React.Component {

    handleChangeWayPointName(wayPointID, newName) {
        this.props.onChangeWayPointName(wayPointID, newName);
    }

    renderWayPointInfo(wpIdx) {
        let directions = this.props.route.directions;
        if (directions) {
            let direction = directions[0];
            let legs = direction.legs;
            let leg = legs[wpIdx];
            if (leg) {
                return (
                    <WayPointInfo distance={leg.distance.text} duration={leg.duration.text}/>
                );
            }
        }
    }

    renderWayPoints() {
        return (
            <ul className='way-points'>
                {
                    this.props.wayPoints.map((wp, idx) => {
                        return (
                            <li key={wp.id}>
                                <WayPoint
                                    mapService={this.props.mapService}
                                    wayPoint={wp}
                                    onAdd={this.props.onAdd.bind(this, wp.id)}
                                    onRemove={this.props.onRemove.bind(this, wp.id)}
                                    onNameChange={this.handleChangeWayPointName.bind(this)}
                                />
                                {this.renderWayPointInfo(idx)}
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