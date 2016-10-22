let React = require('react');
let Link = require('./core/link');
let Route = require('./route');
let Map = require('./map');


class Routes extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (this.props.routes == nextProps.routes);
    }

    handleAddRoute(e) {
        e.preventDefault();
        this.props.onAdd();
    }

    handleChangeRoute(id) {
        this.props.onChangeRoute(id);
    }

    handleChangeRouteName(routeId, newName) {
        this.props.onChangeRouteName(routeId, newName);
    }

    renderRouteTabs() {
        return (
            <ul className="tabs">
                {
                    this.props.routes.map((r, idx) => {
                        return (
                            <li key={r.id}>
                                <Link onClick={this.handleChangeRoute.bind(this, r.id)}>{idx + 1}</Link>
                            </li>
                        )
                    })
                }
                <li>
                    <a href="#" onClick={this.handleAddRoute.bind(this)}>+ Add Route</a>
                </li>
            </ul>
        )
    }

    render() {

        return (
            <div className='routes'>
                <Route
                    mapService={this.props.mapService}
                    route={this.props.activeRoute}
                    onNameChange={this.handleChangeRouteName.bind(this)}
                />
                <Map mapData={this.props.mapData} mapService={this.props.mapService}/>
            </div>
        );
    }
}
;

module.exports = Routes;