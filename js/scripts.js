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

let i = 0;
for (let i = 0; i < pokemonList.length; i++){
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '<br>');
    if (pokemonList[i].height > 1){
        document.write(' - Wow, that\'s big!' + '<br>');
    }
}