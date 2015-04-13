var React = require('react'),
    vent = require('../util/vent');

var RoutePlan = React.createClass({
    addWayPoint: function () {
        vent.trigger('map:directions:update');
    },
    render: function () {
        return (
            <div className='route-plan'>
                <h2>Route Plan</h2>
                <input type='button' value='add' onClick={this.addWayPoint} />
            </div>
            );
    }
});

module.exports = RoutePlan;