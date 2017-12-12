/**
 * Allows the different objects to talk to each other
 *
 * @constructor
 */
function EventDispatcher() {
    this._listeners = [];
}

/**
 * Handlers are attached here and stored in _listeners
 *
 * @param {Function} listener
 */
EventDispatcher.prototype.attach = function(listener) {
    this._listeners.push(listener);
};

/**
 * Invokes all the callbacks that are stored in _listeners
 *
 * @param {Object} args
 */
EventDispatcher.prototype.notify = function(args) {
    for (let listener of this._listeners) {
        listener(args);
    }
};