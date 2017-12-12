function View(model) {
    this.model = model;
    this.addPokemonEvent = new EventDispatcher();
    this.deletePokemonEvent = new EventDispatcher();

    this.init();
}

/**
 * Init function
 */
View.prototype.init = function() {
    this.cacheElements()
        .setUpHandlers();
};

/**
 * Cache view elements for reference
 *
 * @returns {View}
 */
View.prototype.cacheElements = function() {
    this.$pokemonSelect =  $("#pokemonSelect");
    this.$deletePokemonButton = $('.deletePokemon');

    return this;
};

/**
 * Sets up handlers
 */
View.prototype.setUpHandlers = function() {
    this.$pokemonSelect.on("select2:select", (e) => {
        this.addPokemonEvent.notify({
            pokemonId: $(e.currentTarget).val()
        });
    });
};
