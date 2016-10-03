var {connect} = require('react-redux');
var Actions = require('../actions');
var WayPoints = require('../components/way-points');

const mapStateToProps = (state) => {
    return {
        wayPoints: state.wayPoints
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (id) => {
            dispatch(Actions.addWayPoint(id))
        },
        onRemove: (id) => {
            dispatch(Actions.removeWayPoint(id))
        }
    }
};

const WayPointsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WayPoints);

module.exports = WayPointsContainer;