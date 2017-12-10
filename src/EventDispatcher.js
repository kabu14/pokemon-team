function EventDispatcher() {
    this._listeners = [];
}

EventDispatcher.prototype.attach = (listener) => {
    this._listeners.push(listener);
};

EventDispatcher.prototype.notify = (args) => {
    for (let listener of this._listeners) {
        listener(args);
    }
};