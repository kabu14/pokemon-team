function Controller(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

/**
 * Lets the model retrieve Pokemon
 */
Controller.prototype.init = function() {
    // Create a promise that all the pokemon specified by the number have been retrieved
    this.model.getPokemonByNumber(10).then(
        function (availablePokemon) {
            $("#pokemonSelect").select2({
                data: availablePokemon
            });
        }
    )

};