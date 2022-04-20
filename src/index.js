console.log("Happy hacking :)");

const url_api = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=153";

const appNode = document.querySelector("#app");

async function fetchData() {
    const allPokemon = [];
    try {
        const response = await fetch(url_api);
        const info = await response.json();
        info.results.forEach((item) => {
            const url_pokemon = item.url;
            window.fetch(url_pokemon).then((responsePokemon) => responsePokemon.json()).then((infoPokemon) => {
                const pokemonName = infoPokemon.forms[0].name;
                // console.log(pokemonName);
                const name = document.createElement("h2");
                name.classList.add("pokemon__name");
                name.textContent = pokemonName;

                const pokemonId = infoPokemon.id;
                const zeros = returnZeros(pokemonId);
                // console.log(pokemonId);
                const id = document.createElement("p");
                id.classList.add("pokemon__id");
                id.textContent = zeros + pokemonId;

                const pokemonMoves = [];
                const moves = document.createElement("div");
                moves.classList.add("pokemon__moves");
                for (let i = 0; i < 4; i++) {
                    pokemonMoves.push(infoPokemon.moves[i].move.name);
                    const move = document.createElement("p");
                    move.classList.add("pokemon__moves--move");
                    move.textContent = pokemonMoves[i];
                    moves.append(move);
                }
                // console.log(pokemonMoves);

                const url_pokemonSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${pokemonId}.png`;
                // console.log(url_pokemonSprite);
                const img = document.createElement('img');
                img.classList.add("pokemon__image");
                img.src = url_pokemonSprite;

                const pokemonTypes = [];
                infoPokemon.types.forEach((type) => {
                    pokemonTypes.push(type.type.name);
                });
                // console.log(pokemonTypes);
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
                    type.textContent = pokemonTypes[i];
                    types.append(type);
                }

                const pokemonContainer = document.createElement('div');
                const pokemonContainerP2 = document.createElement('div');
                pokemonContainerP2.classList.add("pokemon__container--white");
                pokemonContainerP2.append(types, moves)
                pokemonContainer.classList.add("pokemon__container");
                pokemonContainer.append(id, img, name, pokemonContainerP2);
                allPokemon.push(pokemonContainer);
                // console.log(allPokemon)
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