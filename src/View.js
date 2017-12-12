function View(model) {
    this.model = model;
    this.addPokemonEvent = new EventDispatcher();
    this.removePokemonEvent = new EventDispatcher();

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
    this.pokemonTeamContainer = document.getElementById('pokemonTeam');

    return this;
};

/**
 * Sets up handlers.
 */
View.prototype.setUpHandlers = function() {
    /**
     * On select event of the select2 select.
     */
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
    });

    this.model.removePokemonEvent.attach((pokemonId) => {
        this.remove(pokemonId);
    })
};

/**
 * Sets up the remove handler since the button is dynamically added to the DOM
 *
 * @param element
 */
View.prototype.setUpRemoveHandler = function(element) {
    /**
     * Remove pokemon event
     */
    element.addEventListener('click', (e) => {
        e.preventDefault();
        this.removePokemonEvent.notify({
            pokemonId: e.target.getAttribute('data-pokemon-id')
        });
    });
}

/**
 * Shows the pokemon to the UI.
 */
View.prototype.show = function(pickedPokemon) {
    let statsContent = '',
        removeParentElement;
    for (let stat of pickedPokemon.stats) {
        statsContent += `<li class="list-group-item">${stat.stat.name}: ${stat.base_stat}</li>`;
    }

    let content = `<div class="col-md pokemon" data-pokemon-id="${pickedPokemon.id}">
                    <div class="card"">
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
                            <a href="#" class="btn btn-primary removePokemon" data-pokemon-id="${pickedPokemon.id}">Remove</a>
                        </div>
                    </div>
                </div>
            </div>`;
    this.pokemonTeamContainer.insertAdjacentHTML('beforeend', content);

    removeParentElement = document.querySelector('.pokemon[data-pokemon-id="' + pickedPokemon.id + '"]');
    this.setUpRemoveHandler(removeParentElement);
};

/**
 * The removal of the pokemon in the UI
 *
 * @param {Number} pokemonId
 */
View.prototype.remove = function(pokemonId) {
    document.querySelector('.pokemon[data-pokemon-id="' + pokemonId + '"]').remove();
};