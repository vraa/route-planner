var React = require('react');

var RouteInfo = React.createClass({
    render: function () {
        var wayPoint = this.props.wayPoint,
            distance = wayPoint.get('distance'),
            distanceText = (distance && distance.text) || '',
            duration = wayPoint.get('duration'),
            durationText = (duration && duration.text) || '';

        return (
            <div className='route-info'>
                <p>
                    <span className='distance'>{distanceText}</span>
                    <span className='duration'>{durationText}</span>
                </p>
            </div>
            );
    }
});

module.exports = RouteInfo;