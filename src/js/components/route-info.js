let React = require('react');
import RouteVisual from './route-visual';

let MINUTE = 60;
let HOUR = 3600;
let DAY = 86400;

let toMiles = (meters) => meters * 0.000621371;
let ALT_COLORS = ['#E01931', '#FEC606'];

class RouteInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    getCanvas() {

        let canvasElm = this.canvasElm;
        let ctx = this.ctx;

        let cW = canvasElm.width;
        let cH = canvasElm.height;
        let midW = cW / 2;
        let midH = cH / 2;
        let pad = 10;
        let env = {
            cW,
            cH,
            midW,
            midH,
            pad
        };

        return {
            ctx,
            env
        };
    }

    drawDistanceSegments(ctx, env, totalDistance = 0, segments = []) {

        let startX = 0;
        let barH = 10;
        let startY = env.cH - barH;
        let barW = env.cW;

        ctx.save();
        if (segments.length <= 1) {
            ctx.fillStyle = ALT_COLORS[0];
            ctx.fillRect(startX, startY, barW, barH);
        } else {
            let i;
            ctx.clearRect(0, startY, barW, barH);

            for (i = 0; i < segments.length - 1; i++) {
                let segX = startX;
                let segY = startY;
                let segW = Math.floor((barW * segments[i]) / totalDistance);
                ctx.fillStyle = ALT_COLORS[i % 2 === 0 ? 0 : 1];
                ctx.fillRect(segX, segY, segW, barH);
                startX += segW;
            }
            ctx.fillStyle = ALT_COLORS[i % 2 === 0 ? 0 : 1];
            ctx.fillRect(startX, startY, (barW - startX), barH);

        }
    }

    renderDistance(distance = 0) {
        return (
            <div className="distance">
                <h2><i className="icon-directions_car"/> Distance</h2>
                <p className="value">{distance > 0 ? (toMiles(distance).toFixed(2)) : 0}</p>
                <p className="unit">{distance <= 1 ? 'mile' : 'miles'}</p>
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
                <p className='unit'>hour</p>
            </li>);
        } else {
            // map duration to days / hours / minutes
            if (duration >= DAY) {
                time.days = Math.floor(duration / DAY);
                duration = duration % DAY;
                dayElm = (<li className='days'>
                    <p className='value'>{time.days}</p>
                    <p className='unit'>{time.days <= 1 ? 'day' : 'days'}</p>
                </li>);
            }

            if (duration >= HOUR) {
                time.hours = Math.floor(duration / HOUR);
                duration = duration % HOUR;
                hourElm = (<li className='hours'>
                    <p className='value'>{time.hours}</p>
                    <p className='unit'>{time.hours <= 1 ? 'hour' : 'hours'}</p>
                </li>);
            }

            if (duration >= MINUTE) {
                time.minutes = Math.floor(duration / MINUTE);
                duration = duration % MINUTE;
                minuteElm = (<li className='minutes'>
                    <p className='value'>{time.minutes}</p>
                    <p className='unit'>{time.minutes <= 0 ? 'minute' : 'minutes'}</p>
                </li>);
            }

        }


        return (
            <div className="duration">
                <h2><i className="icon-clock"/> Duration</h2>
                <ul>
                    {elm}
                    {dayElm}
                    {hourElm}
                    {minuteElm}
                </ul>
            </div>
        )
    }

    extractDisplayData(props) {
        let source = props || this.props;
        let directions = source.route.directions;
        let distances = [];
        let totalDistance = 0, totalDuration = 0, direction, legs, leg;
        if (directions) {
            direction = directions[0];
            legs = direction.legs;
            for (let l = 0; l < legs.length; l++) {
                let leg = legs[l];
                distances.push(leg.distance.value);
                totalDistance += leg.distance.value;
                totalDuration += leg.duration.value;
            }
        }
        return {
            distances,
            totalDistance,
            totalDuration
        };
    }

    render() {
        let data = this.extractDisplayData();
        return (
            <div className="route-info">
                <div className="textual">
                    {this.renderDistance(data.totalDistance)}
                    {this.renderDuration(data.totalDuration)}
                </div>
                <RouteVisual data={data}/>
            </div>
        )
    }
}

module.exports = RouteInfo;