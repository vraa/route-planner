var React = require('react');

var MINUTE = 60,
    HOUR = 3600,
    DAY = 86400;

var DashBoard = React.createClass({
    render: function () {
        var route = this.props.route,
            time = {
                days: 0,
                hours: 0,
                minutes: 0
            },
            duration = 0,
            unitOfDuration = 'minutes',
            distance = 0,
            dayElm,
            hourElm,
            minuteElm;

        route.map(function (wayPoint) {
            var dist = wayPoint.get('distance'),
                dura = wayPoint.get('duration');
            if (dist) {
                distance += dist.value;
            }
            if (dura) {
                duration += dura.value;
            }
        });

        // to miles
        distance = Math.ceil(distance * 0.000621371);

        // map duration to days / hours / minutes
        if (duration >= DAY) {
            time.days = Math.floor(duration / DAY);
            duration = duration % DAY;
            dayElm = (<li className='days'>
                <p className='value'>{time.days}</p>
                <p className='unit'>days</p>
            </li>);
        }

        if (duration >= HOUR) {
            time.hours = Math.floor(duration / HOUR);
            duration = duration % HOUR;
            hourElm = (<li className='hours'>
                <p className='value'>{time.hours}</p>
                <p className='unit'>hours</p>
            </li>);
        }

        if (duration >= MINUTE) {
            time.minutes = Math.floor(duration / MINUTE);
            duration = duration % MINUTE;
            minuteElm = (<li className='minutes'>
                <p className='value'>{time.minutes}</p>
                <p className='unit'>minutes</p>
            </li>);
        }

        return (
            <div className='dashboard'>
                <div className='distance'>
                    <p className='value'>
                    {distance}
                    </p>
                    <p className='unit'>
                    miles
                    </p>
                </div>
                <div className='duration'>
                    <ul>
                    {dayElm}
                    {hourElm}
                    {minuteElm}
                    </ul>
                </div>
            </div>
            );
    }
});

module.exports = DashBoard;