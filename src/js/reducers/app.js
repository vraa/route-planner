const app = (state = {}, action) => {

    switch (action.type) {
        case 'TEXT_CLICK':
            console.log('text clicked');
            return {
                name: new Date().toUTCString()
            }
        default:
            return state;
    }
}

module.exports = app;