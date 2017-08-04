import React, {Component} from 'react';

class WayPointDetails extends Component {
    render() {
        return (
            <div className="way-point-details">
                <h2>Way Point Details</h2>
                <button onClick={this.props.onClose}>close</button>
            </div>
        )
    }
}

export default WayPointDetails;