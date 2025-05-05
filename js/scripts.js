let pokemonList = [
    {
        name: "Bulbasaur",
        type: ["grass", "poison"],
        height: 0.7,
        weight: 6.9
    },
    {
        name: "Rattata",
        type: "normal",
        height: 0.3,
        weight: 3.5
    },
    {
        name: "Arcanine",
        type: "fire",
        height: 1.9,
        weight: 155
    },
    {
        name: "Weedle",
        type: ["bug", "poison"],
        height: 0.3,
        weight: 3.2
    }
];

//Display the list of Pokemon w/ heights on the DOM via 'for' loop
// for (let i = 0; i < pokemonList.length; i++) {
//     document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
    //Adds message if Pokemon's height exceeds 1
//     if (pokemonList[i].height > 1) {
//         document.write(' - Wow, that\'s big!');
//     }
//     document.write("<br>");
// }

//display list of pokemon names and heights using forEach method
function pokemonDetails(pokemon) {
    document.write(pokemon.name + ' (height: ' + pokemon.height + ')');
    
    //adds message if pokemon's height exceeds 1
    if (pokemon.height > 1) {
        document.write(' - Wow, that\'s a big one!');
    }
    document.write("<br>");
    }

    pokemonList.forEach(pokemonDetails);