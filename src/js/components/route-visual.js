import React, {Component} from 'react';

const COLORS = [
    '#4A148C',
    '#F57F17',
    '#880E4F',
    '#827717',
    '#B71C1C',
    '#33691E'
];

class RouteVisual extends Component {

    renderRoute(total, segments) {
        let width = 350,
            height = 40;
        let mappedSegments = segments.map((seg) => (width * seg) / total);
        let legX = 0;
        let markX = ( (width / 2) - width);
        return (
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
            >
                <symbol
                    id="marker"
                    viewBox="0 0 512 512"
                >
                    <path
                        d="M256 0C167.634 0 96 71.634 96 160c0 160 160 352 160 352s160-192 160-352C416 71.634 344.365 0 256 0zm0 258c-54.124 0-98-43.876-98-98s43.876-98 98-98 98 43.876 98 98-43.876 98-98 98zm-62-98c0-34.242 27.758-62 62-62s62 27.758 62 62c0 34.242-27.76 62-62 62s-62-27.758-62-62z"/>
                </symbol>
                <use
                    xlinkHref="#marker"
                    x={markX}
                    y={0}
                    height={height / 2}
                    fill={'blue'}
                />
                {
                    mappedSegments.map((leg, idx) => {
                        let markerElm = idx === 0 ? null : <use
                            key={'mark' + idx}
                            xlinkHref="#marker"
                            x={markX}
                            y={0}
                            height={height / 2}
                            fill={COLORS[idx]}
                        />;

                        markX = markX + leg;

                        return markerElm;
                    })
                }
                <use
                    xlinkHref="#marker"
                    x={width / 2}
                    y={0}
                    height={height / 2}
                    fill={'blue'}
                />
                {
                    mappedSegments.map((leg, idx) => {
                        let legElm = <rect
                            key={'leg' + idx}
                            x={legX}
                            y={height / 2}
                            width={legX + leg}
                            height={height / 2}
                            fill={COLORS[idx]}
                        />;
                        legX = legX + leg;
                        return legElm;
                    })
                }
            </svg>
        )
    }

    render() {
        let {data} = this.props;
        let {totalDistance, distances} = data;

        // totalDistance = 5000;
        // distances = [2500, 2500];

        return !totalDistance ? null : (
            <div className="route-visual">
                {this.renderRoute(totalDistance, distances)}
            </div>
        )
    }
}

export default RouteVisual;