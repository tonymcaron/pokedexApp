let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Function to add Pokemon to the list w/ conditional
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

  //Function to create buttons for each Pokemon
  function addListItem(pokemon) {
    //Select unordered list
    let pokemonList = document.querySelector('.pokemon-list');

    //Create list item
    let listPokemon = document.createElement('li');

    listPokemon.classList.add('list-group-item');

    //Create button
    let button = document.createElement('button');

    button.classList.add('btn', 'btn-primary');

    //set button text to Pokemon name
    button.innerText = pokemon.name;

    //Append button to list item
    listPokemon.appendChild(button);

    //Append list item to unordered list
    pokemonList.appendChild(listPokemon);

    //Add event listener to button
    button.addEventListener('click', function () {
      //Call showDetails function with the specific Pokemon object
      pokemonRepository.showDetails(pokemon);
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

  //Modal function to show details of clicked Pokemon
  function showModal(pokemon) {
    
    //Update modal title
    $('.modal-title').text(pokemon.name);
    //Update image
    $('.pokemonImage').attr('src', pokemon.imageUrl);
    //Update height
    $('.heightElement').text('Height: ' + pokemon.height);
    //Update types
    let typeNames = pokemon.types.map(typeInfo => typeInfo.type.name);
    $('.typesElement').text('Types: ' + typeNames.join(', '));

    $('#pokemonModal').modal('show');
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    }).catch(function (e) {
      console.error('Error loading details:', e);
    });
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
