let Event = () => {
    this._listeners = [];
};

Event.prototype.attach = (listener) => {
    this._listeners.push(listener);
};

Event.prototype.notify = (args) => {
    for (let listener of this._listeners) {
        listener(args);
    }
};