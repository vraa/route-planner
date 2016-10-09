let directionsService;

var API = {

    initMapService: (mapService) => {
        directionsService = new mapService.maps.DirectionsService();
    },

    fetchRoutes: (wayPoints, google) => {

        return new Promise((resolve, reject)=> {
            if (wayPoints.length < 2) {
                resolve();
            } else {
                let request = {
                    origin: wayPoints[0].name,
                    destination: wayPoints[wayPoints.length - 1].name,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                let wayPointsInBetween = [];
                let noOfWayPointsInBetween = wayPoints.length - 2;

                if (noOfWayPointsInBetween > 0) {
                    for (let i = 1; i <= noOfWayPointsInBetween; i++) {
                        wayPointsInBetween.push({location: wayPoints[i].name});
                    }
                }

                request.waypoints = wayPointsInBetween;

                directionsService.route(request, (response, status) => {
                    if (status === 'OK') {
                        resolve(response);
                    } else {
                        reject(status);
                    }
                });
            }
        });
    }

};

module.exports = API;