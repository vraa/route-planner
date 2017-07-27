import React, {Component} from 'react';

class AppBar extends Component {

    render() {
        return (
            <header className="app-bar">
                <h1><a href="https://veerasundar.com/route-planner/">Route Planner</a></h1>
                <div className="author-details">
                    <p>Built by <a href="https://veerasundar.com/" title="JavaScript developer">Veera</a> | <a
                        href="https://github.com/vraa/route-planner"> Source</a></p>
                </div>
            </header>
        )
    }
}

export default AppBar;