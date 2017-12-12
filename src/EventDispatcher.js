function EventDispatcher() {
    this._listeners = [];
}

EventDispatcher.prototype.attach = function(listener) {
    this._listeners.push(listener);
};

EventDispatcher.prototype.notify = function(args) {
    for (let listener of this._listeners) {
        listener(args);
    }
};