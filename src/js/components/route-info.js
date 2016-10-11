let React = require('react');
let MINUTE = 60;
let HOUR = 3600;
let DAY = 86400;

let toMiles = (meters) => meters * 0.000621371;

class RouteInfo extends React.Component {

    constructor(props) {
        super(props);
    }


    renderDistance(distance = 0) {
        return (
            <div className="distance">
                <p className="value">{distance > 0 ? (toMiles(distance).toFixed(2)) : 0}</p>
                <p className="unit">miles</p>
            </div>
        )
    }

    renderDuration(duration = 0) {
        let time = {
            days: 0,
            hours: 0,
            minutes: 0
        };
        let elm;
        let dayElm;
        let hourElm;
        let minuteElm;

        if (duration === 0) {
            elm = (<li className='hours'>
                <p className='value'>{0}</p>
                <p className='unit'>hours</p>
            </li>);
        } else {
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

        }


        return (
            <div className="duration">
                <ul>
                    {elm}
                    {dayElm}
                    {hourElm}
                    {minuteElm}
                </ul>
            </div>
        )
    }

    render() {
        let directions = this.props.route.directions;
        let distance = 0, duration = 0, direction, legs, leg;
        if (directions) {
            direction = directions[0];
            legs = direction.legs;
            for (let l = 0; l < legs.length; l++) {
                let leg = legs[l];
                distance += leg.distance.value;
                duration += leg.duration.value;
            }
        }
        return (
            <div className="route-info">
                <div className="wrap-out">
                    <div className="wrap-in">
                        {this.renderDistance(distance)}
                        {this.renderDuration(duration)}
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = RouteInfo;