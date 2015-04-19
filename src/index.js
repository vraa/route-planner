var React = require('react'),
    domReady = require('domready'),
    Application = require('./components/application'),
    GoogleMaps = require('google-maps');

domReady(function () {
    GoogleMaps.LIBRARIES = ['places', 'adsense'];
    GoogleMaps.load(function (google) {
        React.render(<Application mapService={google}/>, document.getElementById('app'));
    });
});