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

  //Modal function to show details of clicked Pokemon
  function showModal(name, height, img) {
    //Creating modal content variables
    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');
    
    //Clears existing modal content
    modalTitle.empty();
    modalBody.empty();

    //Creating element for name in modal content
    let nameElement = $('<h1>' + item.name + '</h1>');
    //Creating img in modal content
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr('src', item.imageUrl);
    //Creating element for height in modal content
    let heightElement = $('<p>' + 'Height: ' + item.height + '</p>');
    //Creating element for types in modal content
    let typesElement = $('<p>' + 'Types: ' + item.types + '</p>');

    //Append elements to modal content
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
  }  

  //   let modal = document.createElement('div');
  //   modal.classList.add('modal');

  //   let closeButtonElement = document.createElement('button');
  //   closeButtonElement.classList.add('modal-close');
  //   closeButtonElement.innerText = 'X';
  //   closeButtonElement.addEventListener('click', hideModal);

  //   let pokemonName = document.createElement('h1');
  //   pokemonName.innerText = name;

  //   let pokemonHeight = document.createElement('p');
  //   pokemonHeight.innerText = height;

  //   let pokemonImage = document.createElement('img');
  //   pokemonImage.setAttribute('src', img);
  //   pokemonImage.setAttribute('width', '100%');
  //   pokemonImage.setAttribute('height', '100%');

  //   modal.appendChild(closeButtonElement);
  //   modal.appendChild(pokemonName);
  //   modal.appendChild(pokemonHeight);
  //   modal.appendChild(pokemonImage);
  //   modalContainer.appendChild(modal);

  //   modalContainer.classList.add('is-visible');

  //   modalContainer.addEventListener('click', (e) => {
  //     let target = e.target;
  //     if (target === modalContainer) {
  //       hideModal();
  //     }
  //   });

  //   window.addEventListener('keydown', (e) => {
  //     let modalContainer = document.querySelector('#modal-container');
  //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  //       hideModal();
  //     }
  //   });

  //   function hideModal() {
  //     let modalContainer = document.querySelector('#modal-container');
  //     modalContainer.classList.remove('is-visible');
  //   }
  // }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(
        pokemon.name,
        "Height: " + pokemon.height,
        pokemon.imageUrl,
      );
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
