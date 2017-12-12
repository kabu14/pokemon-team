function Controller(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

/**
 * Controller init function to set up the model and the drop down.
 */
Controller.prototype.init = function() {
    // Create a promise that all the pokemon specified by the number have been retrieved
    this.model.getPokemonByNumber(10).then(
        /**
         * Callback from the promise and builds the drop downs
         * @param {Array} availablePokemon
         */
        function (availablePokemon) {
            $("#pokemonSelect").select2({
                data: availablePokemon
            });
        }
    );
};