window.onload = () => {
    let model = new Model(),
        view = new View(model),
        controller = new Controller(model, view);
};