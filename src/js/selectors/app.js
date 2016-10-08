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

    activeRoute: (state) => {
        let activeRouteID = state.activeRouteID;
        return state.routes.find((r) => r.id === activeRouteID);
    }


};

module.exports = AppSelectors;