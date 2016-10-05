var React = require('react');
var Route = require('./route');

class Routes extends React.Component {

    handleAddRoute(e) {
        e.preventDefault();
        this.props.onAdd();
    }

    renderRouteTabs() {
        return (
            <ul>
                {
                    this.props.routes.map((r, idx) => {
                        return (
                            <li key={r.id}>
                                <a href="#">{idx + 1}</a>
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