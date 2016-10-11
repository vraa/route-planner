var React = require('react'),
    vent = require('../util/vent');

var Place = React.createClass({
    doSearch: function (keyword) {

    },
    onSubmit: function (e) {
        e.preventDefault();
        var val = this.refs.keyword.getDOMNode().value;
        if (!!val) {
            this.doSearch(val);
        }
    },
    close: function () {
        vent.trigger('place:close');
    },
    render: function () {
        var place = this.props.place.get('placeDetails');
        console.log(place);
        return (
            <div className='place'>
                <a className='close-place' title='Close' href='#' onClick={this.close}>
                    <i className='icon-clear'></i>
                </a>
                <h2>{place.name}</h2>
                <address dangerouslySetInnerHTML={{__html: place.adr_address}} />
                <div className='nearby-places'>
                    <h3>Search Nearby</h3>
                    <ul className='search-terms'>
                        <li>
                            <form onSubmit={this.onSubmit}>
                                <input ref='keyword' type='text' placeholder='Keyword' />
                            </form>
                        </li>
                        <li>
                            <a onClick={this.doSearch.bind(this, 'restaurant')} href='#'>Restaurant</a>
                        </li>
                        <li>
                            <a onClick={this.doSearch.bind(this, 'gas')} href='#'>Gas</a>
                        </li>
                        <li>
                            <a onClick={this.doSearch.bind(this, 'atm')} href='#'>ATM</a>
                        </li>
                    </ul>
                </div>
            </div>
            );
    }
});

module.exports = Place;