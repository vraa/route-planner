let React = require('react');
let MINUTE = 60;
let HOUR = 3600;
let DAY = 86400;

let toMiles = (meters) => meters * 0.000621371;
let degToRad = (degrees) => (Math.PI / 180) * degrees;
let COLORS = ['#f00', '#0f0', '#00f', '#f00', '#0f0', '#00f', '#f00', '#0f0', '#00f', '#f00', '#0f0', '#00f'];

class RouteInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let cvs = this.getCanvas();
        this.drawDistanceSegments(cvs.ctx, cvs.env, undefined, undefined);
    }

    componentWillReceiveProps(nextProps) {
        let data = this.extractDisplayData(nextProps);
        let cvs = this.getCanvas();
        this.drawDistanceSegments(cvs.ctx, cvs.env, data.totalDistance, data.distances);
    }

    cacheCanvasElm(canvasElm) {
        if (canvasElm) {
            this.canvasElm = canvasElm;
            this.ctx = canvasElm.getContext('2d');
        }
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
        let barH = 5;
        let startY = env.cH - barH;
        let barW = env.cW;

        ctx.save();
        if (segments.length === 0) {
            ctx.fillRect(startX, startY, barW, barH);
        } else {

            for (let i = 0; i < segments.length - 1; i++) {
                let segX = startX;
                let segY = startY;
                let segW = Math.floor((barW * segments[i]) / totalDistance);
                ctx.fillStyle = COLORS[i];
                ctx.fillRect(segX, segY, segW, barH);
                startX += segW;
            }
            ctx.fillStyle = COLORS[segments.length];
            ctx.fillRect(startX, startY, (barW - startX), barH);

        }
    }

    drawArc(ctx, cX, cY, r, sA, eA, color) {
        ctx.beginPath();
        ctx.arc(cX, cY, r, sA, eA, false);
        ctx.strokeStyle = color
        ctx.stroke();
        ctx.closePath();
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

        return (
            <div className="route-info">
                <canvas ref={this.cacheCanvasElm.bind(this)}>

                </canvas>
            </div>
        )
    }
}

module.exports = RouteInfo;