const url_api = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
const appNode = document.querySelector("#app");
const allPokemon = [];

async function fetchData() {
    try {
        const response = await fetch(url_api);
        const data = await response.json();

        data.results.forEach((pokemon) => {
            const url_pokemon = pokemon.url;

            window.fetch(url_pokemon)
                .then((responsePokemon) => responsePokemon.json())
                .then((infoPokemon) => {
                    const pokemonName = infoPokemon.forms[0].name;
                    // console.log(pokemonName);

                    const name = document.createElement("h2");
                    name.classList.add("pokemon__name");
                    name.innerText = pokemonName;

                    const pokemonId = infoPokemon.id;
                    const zeros = returnZeros(pokemonId);
                    const id = document.createElement("p");
                    id.classList.add("pokemon__id");
                    id.innerText = zeros + pokemonId;

                    // const pokemonMoves = [];
                    const moves = document.createElement("div");
                    moves.classList.add("pokemon__moves");

                    for (let i = 0; i < 4; i++) {
                        try {
                            // pokemonMoves.push(infoPokemon.moves[i].move.name);
                            const move = document.createElement("p");
                            move.classList.add("pokemon__moves--move");
                            // move.innerText = pokemonMoves[i];
                            move.innerText = infoPokemon.moves[i].move.name;
                            moves.append(move);
                        } catch (error) {
                            // console.log('error :>> ', error);
                        }
                    }

                    const url_pokemonSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${pokemonId}.png`;
                    const img = document.createElement('img');
                    img.classList.add("pokemon__image");
                    img.src = url_pokemonSprite;

                    const pokemonTypes = [];
                    infoPokemon.types.forEach((type) => {
                        pokemonTypes.push(type.type.name);
                    });
                    const types = document.createElement('div');
                    types.classList.add("pokemon__types");
                    for (let i = 0; i < pokemonTypes.length; i++) {
                        const type = document.createElement('p');
                        type.classList.add("pokemon__types--type");
                        switch (pokemonTypes[i]) {
                            case 'poison':
                                type.classList.add('pokemon__types--type-poison');
                                break;
                            case 'grass':
                                type.classList.add('pokemon__types--type-grass');
                                break;
                            case 'fire':
                                type.classList.add('pokemon__types--type-fire');
                                break;
                            case 'water':
                                type.classList.add('pokemon__types--type-water');
                                break;
                            case 'bug':
                                type.classList.add('pokemon__types--type-bug');
                                break;
                            case 'flying':
                                type.classList.add('pokemon__types--type-flying');
                                break;
                            case 'normal':
                                type.classList.add('pokemon__types--type-normal');
                                break;
                            case 'electric':
                                type.classList.add('pokemon__types--type-electric');
                                break;
                            case 'ground':
                                type.classList.add('pokemon__types--type-ground');
                                break;
                            case 'fairy':
                                type.classList.add('pokemon__types--type-fairy');
                                break;
                            case 'fighting':
                                type.classList.add('pokemon__types--type-fighting');
                                break;
                            case 'psychic':
                                type.classList.add('pokemon__types--type-psychic');
                                break;
                            case 'rock':
                                type.classList.add('pokemon__types--type-rock');
                                break;
                            case 'steel':
                                type.classList.add('pokemon__types--type-steel');
                                break;
                            case 'ice':
                                type.classList.add('pokemon__types--type-ice');
                                break;
                            case 'ghost':
                                type.classList.add('pokemon__types--type-ghost');
                                break;
                            case 'dragon':
                                type.classList.add('pokemon__types--type-dragon');
                                break;
                        }
                        type.innerText = pokemonTypes[i];
                        types.append(type);
                    }

                    const pokemonContainer = document.createElement('div');

                    const pokemonContainerP2 = document.createElement('div');
                    pokemonContainer.classList.add("pokemon__container");
                    pokemonContainerP2.classList.add("pokemon__container--white");

                    pokemonContainerP2.append(types, moves)
                    pokemonContainer.append(id, img, name, pokemonContainerP2);

                    allPokemon.push(pokemonContainer);
                    console.log(allPokemon)
                    appNode.append(...allPokemon);
                });
        });
    } catch (error) {
        console.error(error);
    }
}

fetchData();

function returnZeros(int) {
    if ((int >= 10) && (int < 100)) {
        return '0';
    } else if ((int >= 100)) {
        return '';
    } else {
        return '00';
    }
}