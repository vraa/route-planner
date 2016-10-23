var React = require('react');
var WayPoint = require('./way-point');
var WayPointInfo = require('./way-point-info');
var Link = require('./core/link');
var classnames = require('classnames');
var MAXIMUM_WAY_POINTS = 10;

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
        let cx = classnames({
            'way-points': true,
            'max-way-points': this.props.wayPoints.length >= MAXIMUM_WAY_POINTS
        });
        return (
            <ul className={cx}>
                {
                    this.props.wayPoints.map((wp, idx) => {
                        let icon = (idx === 0 || idx === (this.props.wayPoints.length - 1)) ? 'icon-flag' : 'icon-disc';
                        return (
                            <li key={wp.id}>
                                <i className={icon + ' way-point-icon'}/>
                                <WayPoint
                                    edit={wp.id === this.props.editingWayPoint}
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
                <li className="add-place"><i className="icon-flag"/> <Link onClick={this.props.onAdd.bind(this, 0)}>Add
                    a place</Link></li>
            </ul>
        )
    }

    renderEmptyWayPoints() {
        return (
            <ul className="way-points empty">
                <li><i className="icon-flag"/> <Link onClick={this.props.onAdd.bind(this, 0)}>Add a place</Link></li>
            </ul>
        )
    }


    render() {
        var elm;
        if (this.props.wayPoints.length > 0) {
            elm = this.renderWayPoints();
        } else {
            elm = this.renderEmptyWayPoints();
        }
        return (
            <div className="way-points">
                {elm}
            </div>
        )
    }
}

module.exports = WayPoints;