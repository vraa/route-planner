var React = require('react');
var Link = require('./core/link');
var Route = require('./route');


class Routes extends React.Component {

    handleAddRoute(e) {
        e.preventDefault();
        this.props.onAdd();
    }

    handleChangeRoute(id) {
        this.props.onChangeRoute(id);
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
                {this.renderRouteTabs()}
                <Route route={this.props.activeRoute}/>
            </div>
        );
    }
}
;

module.exports = Routes;