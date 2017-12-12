function View(model) {
    this.model = model;
    this.addPokemonEvent = new EventDispatcher();
    this.deletePokemonEvent = new EventDispatcher();

    this.init();
}

/**
 * Init function.
 */
View.prototype.init = function() {
    this.cacheElements()
        .setUpHandlers();
};

/**
 * Cache view elements for reference.
 *
 * @returns {View}
 */
View.prototype.cacheElements = function() {
    this.$pokemonSelect =  $("#pokemonSelect");
    this.$deletePokemonButton = $('.deletePokemon');
    this.pokemonTeamContainer = document.getElementById('pokemonTeam');

    return this;
};

/**
 * Sets up handlers.
 */
View.prototype.setUpHandlers = function() {
    this.$pokemonSelect.on("select2:select", (e) => {
        this.addPokemonEvent.notify({
            pokemonId: $(e.currentTarget).val()
        });
    });

    /**
     * Event dispatcher handlers that allows the Model to talk to the View.
     */
    this.model.addPokemonEvent.attach((pickedPokemon) => {
        this.show(pickedPokemon);
    })
};

/**
 * Shows the pokemon to the UI.
 */
View.prototype.show = function(pickedPokemon) {
    let statsContent = '';
    for (let stat of pickedPokemon.stats) {
        statsContent += `<li class="list-group-item">${stat.stat.name}: ${stat.base_stat}</li>`;
    }

    let content = `<div class="col-md">
                    <div class="card">
                        <div class="card-header">${pickedPokemon.text}</div>
                        <img class="card-img-top" src="${pickedPokemon.sprite}" alt="Card image cap">
                        <div class="card-body">
                            <h4 class="card-header">
                                Stats
                            </h4>
                            <ul class="list-group list-group-flush mb-2">
                                ${statsContent}
                            </ul>
                        </div>
                        <div class="card-body">
                            <a href="#" class="btn btn-primary">Remove</a>
                        </div>
                    </div>
                </div>
            </div>`;
    this.pokemonTeamContainer.insertAdjacentHTML('beforeend', content);
};