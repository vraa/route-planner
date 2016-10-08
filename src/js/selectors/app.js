var AppSelectors = {

    recentlyAddedWayPoint: (state) => {
        let wp = state.wayPoints;
        if (wp.length > 0) {
            return wp[wp.length - 1];
        }
    },

    activeRoute: (state) => {
        let activeRouteID = state.activeRouteID;
        return state.routes.find((r) => r.id === activeRouteID);
    },

    firstRoute: (state) => {
        let routes = state.routes;
        if (routes.length > 0) {
            return routes[0];
        }
    }
};

module.exports = AppSelectors;