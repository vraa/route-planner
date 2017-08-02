var AppSelectors = {

    recentlyAddedRoute: (state) => {
        let routes = state.routes;
        if (routes.size > 0) {
            return routes.last();
        }
    },

    firstRoute: (state) => {
        let routes = state.routes;
        if (routes.size > 0) {
            return routes.first();
        }
    },

    recentlyAddedWayPoint: (state) => {
        let wp = state.wayPoints;
        if (wp.length > 0) {
            return wp[wp.length - 1];
        }
    },

    activeRouteID: (state) => {
        return state.activeRouteID;
    },

    activeRoute: (state) => {
        if (state.routes) {
            let activeRouteID = state.activeRouteID;
            return state.routes.find((r) => r.id === activeRouteID);
        }
    },

    activeWayPoints: (state) => {
        let wayPoints = [];
        let activeRouteID = state.activeRouteID;
        let activeRoute = state.routes.find((r) => r.id === activeRouteID);

        if (activeRoute) {
            activeRoute.wayPoints.forEach((wpID) => {
                let wayPoint = state.wayPoints.find((wp) => wp.id === wpID);
                if (wayPoint) {
                    wayPoints.push(wayPoint);
                }
            });
        }
        return wayPoints;
    }


};

module.exports = AppSelectors;