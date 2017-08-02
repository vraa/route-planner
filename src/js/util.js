import Immutable from 'immutable';

var Util = {
    guid: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    transformSavedState: (st) => {
        if (!st) {
            return null;
        }
        let routes = st.routes.map((r) => {
            return Object.assign({}, r, {
                wayPoints: Immutable.List(r.wayPoints)
            });
        });
        let transformed = Object.assign({}, st, {
            routes: Immutable.List(routes),
            wayPoints: Immutable.List(st.wayPoints)
        });
        return transformed;
    }
};

module.exports = Util;