function View(model) {
    this.model = model;
    this.addTaskEvent = new EventDispatcher();
}