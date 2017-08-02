const db = window.localStorage;

let storage = {

    set: (key, val) => {
        if (key && val) {
            db.setItem(key, val);
        }
    },

    get: (key) => {
        let val = db.getItem(key);
        return val ? JSON.parse(val) : null;
    }
};

export default storage;