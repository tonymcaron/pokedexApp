let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
        
    //Function to add Pokemon to the list w/ if condition
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
        pokemonList.push(pokemon);
        } else {
            console.log("Pokemon is invalid.");
        }
    }

    ///Function to get all Pokemon from the list
    function getAll() {
        return pokemonList;
    }

    //Function to add Pokemon to the list
    function addListItem(pokemon) {
        //Select unordered list
        let pokemonList = document.querySelector('.pokemon-list');

        //Create list item
        let listPokemon = document.createElement('li');

        //Create button
        let button = document.createElement('button');

        //set button text to Pokemon name
        button.innerText = pokemon.name;

        //Add button class for styling
        button.classList.add("button-class");

        //Append button to list item
        listPokemon.appendChild(button);

        //Append list item to unordered list
        pokemonList.appendChild(listPokemon);

        //Add event listener to button
        button.addEventListener('click', function () {
            //Call showDetails function with the specific Pokemon object
            showDetails(pokemon);
        })
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //Adding details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Function to log details of the clicked Pokemon in console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

//Below is content from exercises 1.6 and previous
//Pokemon repository with IIFE to store and manage Pokemon list
// let pokemonRepository = (function () {
//     let pokemonList = [
//         {
//             name: "Bulbasaur",
//             type: ["grass", "poison"],
//             height: 0.7,
//             weight: 6.9
//         },
//         {
//             name: "Rattata",
//             type: "normal",
//             height: 0.3,
//             weight: 3.5
//         },
//         {
//             name: "Arcanine",
//             type: "fire",
//             height: 1.9,
//             weight: 155
//         },
//         {
//             name: "Weedle",
//             type: ["bug", "poison"],
//             height: 0.3,
//             weight: 3.2
//         }
//     ];

//     //Function to add Pokemon to the list
//     function add(pokemon) {
//         pokemonList.push(pokemon);
//     }

//     ///Function to get all Pokemon from the list
//     function getAll() {
//         return pokemonList;
//     }

//     //Function to add Pokemon to the list
//     function addListItem(pokemon) {
//         //Select unordered list
//         let pokemonList = document.querySelector('.pokemon-list');

//         //Create list item
//         let listPokemon = document.createElement('li');

//         //Create button
//         let button = document.createElement('button');

//         //set button text to Pokemon name
//         button.innerText = pokemon.name;

//         //Add button class for styling
//         button.classList.add("button-class");

//         //Append button to list item
//         listPokemon.appendChild(button);

//         //Append list item to unordered list
//         pokemonList.appendChild(listPokemon);

//         //Add event listener to button
//         button.addEventListener('click', function () {
//             //Call showDetails function with the specific Pokemon object
//             showDetails(pokemon);
//         })
//     }

//     //Function to show details of the clicked Pokemon
//     function showDetails(pokemon) {
//         console.log(pokemon.name)
//     }

//     return {
//         add: add,
//         getAll: getAll,
//         addListItem: addListItem,
//     };
// })();

//Adding Pokemon to the repository
// pokemonRepository.add({ name: 'Abra', type: 'Psychic', height: 0.9, weight: 19.5 });

//exercise 1.6 - DOM manipulation practice
// function pokemonDetails(pokemonDetails) {
// let pokemonButtons = document.querySelector('.pokemon-list');
// document.write(pokemon.name + ' (height: ' + pokemon.height + ')');

//adds message if pokemon's height exceeds 1
// if (pokemon.height > 1) {
// document.write(' - Wow, that\'s a big one!');
// }
// document.write("<br>");
// }

// pokemonRepository.getAll().forEach(function (pokemon) {
//     pokemonRepository.addListItem(pokemon);
// });


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
// function pokemonDetails(pokemon) {
//     document.write(pokemon.name + ' (height: ' + pokemon.height + ')');

//adds message if pokemon's height exceeds 1
//     if (pokemon.height > 1) {
//         document.write(' - Wow, that\'s a big one!');
//     }
//     document.write("<br>");
// }

// pokemonRepository.getAll().forEach(pokemon);


