function Model() {
    this.teamPokemon = [];
    this.availablePokemon = [];
    this.addPokemonEvent = new EventDispatcher();
    this.removePokemonEvent = new EventDispatcher();
}

/**
 * Wrapper for the fetch GET API.
 * Mode is set to no-cors to allow cross origin requests.
 *
 * @param {String} url
 *
 * @returns {Promise<Response>}
 */
Model.prototype.get = function(url) {
    return fetch(url).then(
        function fulfilled(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed with status code ' + response.status)
        }
    )
};

/**
 * Gets a list of pokemon based on the number provided
 *
 * @param {Number} num
 *
 * @returns {Promise<any>}
 */
Model.prototype.getPokemonByNumber = function(num) {
    return new Promise((resolve, reject) => {
        // Since id doesn't get used sequentially inside the async fetch request a
        // variable is used to track how many times the loop has ran for
        let timesRan = 1;
        for (let id = 1; id <= num; id++) {
            this.get('https://pokeapi.co/api/v2/pokemon/' + id).then(
                (response) => {
                    if (response.detail !== "Not found.") {
                        this.groupPokemon(response);
                    }

                    // When we are sure the number of times the sync loop matches the num variable
                    if (timesRan == num) {
                        resolve(this.availablePokemon);
                    }

                    timesRan++;
                },
                (error) => {
                    reject(error);
                }
            );
        }
    });
};

/**
 * Groups pokemon along with their stats based on their type(s)
 *
 * @param {Object} pokemon
 */
Model.prototype.groupPokemon = function(pokemon) {
    let pokemonContainer,
        id = pokemon.id,
        name = pokemon.name,
        sprite = pokemon.sprites.front_default,
        stats = pokemon.stats;

    // First sort by the type
    if (!_.isNil(pokemon.types)) {
        for (let type of pokemon.types) {
            let typeName = type.type.name,
                typeGroup;

            // Set up the data for select2 to consume and show the drop down
            pokemonContainer = {
                id,
                stats,
                text: name,
                sprite
            };
            // Check if there is an object with the type text,
            // if not create it and put it inside the availablePokemon
            typeGroup = _.find(this.availablePokemon, {text: typeName});
            if (!typeGroup) {
                this.availablePokemon.push({text: typeName, children: [pokemonContainer]});
            } else {
                typeGroup.children.push(pokemonContainer);
            }
        }
    }
};

/**
 * Adds the pokemon chosen in the select by finding the id in the available model.
 *
 * @param {Number} pokemonId
 */
Model.prototype.addPokemon = function(pokemonId) {
    let pickedPokemon;
    // Since the select only provides the ID, it can be used to track which pokemon
    // in the model.
    for (let pokemon of this.availablePokemon) {
        for (let child of pokemon.children) {
            if (child.id == pokemonId) {
                pickedPokemon = child;
                break;
            }
        }

        // If the pokemon is found break out of the search
        if (!_.isNil(pickedPokemon)) {
            break;
        }
    }

    // Add the picked pokemon to the team
    this.teamPokemon.push(pickedPokemon);
    this.addPokemonEvent.notify(pickedPokemon)
};

/**
 * Removes the pokemon from the model
 * TODO - Remove pokemon from model.
 *
 * @param {Number} pokemonId
 */
Model.prototype.removePokemon = function(pokemonId) {
    this.removePokemonEvent.notify(pokemonId)
};

/**
 * Gets all the pokemon that's currently in the team.
 *
 * @returns {Array}
 */
Model.prototype.getTeamPokemon = function() {
    return this.teamPokemon;
};
