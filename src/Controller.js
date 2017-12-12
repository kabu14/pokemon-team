function Controller(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

/**
 * Init function.
 */
Controller.prototype.init = function() {
    this.initDropDown(10)
        .setUpHandlers();
};

/**
 * Initializes the drop down with a number of pokemon specified.
 *
 * @param {Number} num
 *
 * @returns {Controller}
 */
Controller.prototype.initDropDown = function(num) {
    // Create a promise that all the pokemon specified by the number have been retrieved
    this.model.getPokemonByNumber(num).then(
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

    return this;
};

/**
 * Sets up handlers
 */
Controller.prototype.setUpHandlers = function() {
    this.view.addPokemonEvent.attach((args) => {
        this.model.addPokemon(args.pokemonId)
    })
};
