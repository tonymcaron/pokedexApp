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

  //Modal function to show details of clicked Pokemon
  function showModal(name, height, img) {
    let modalContainer = document.querySelector('#modal-container');
    
    //Clears existing modal content
    modalContainer.innerText = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = name;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = height;

    let pokemonImage = document.createElement('img');
    pokemonImage.setAttribute('src', img);
    pokemonImage.setAttribute('width', '100%');
    pokemonImage.setAttribute('height', '100%');

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonImage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }
  }

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







//Exercise 1.8, modal function w/ IIFE practice
// (function () {
//   function showModal(title, text) {
//     let modalContainer = document.querySelector('#modal-container');

//     //Clear all existing modal content
//     modalContainer.innerHTML = '';

//     let modal = document.createElement('div');
//     modal.classList.add('modal');

//     //Add the new modal content
//     let closeButtonElement = document.createElement('button');
//     closeButtonElement.classList.add('modal-close');
//     closeButtonElement.innerText = 'Close';
//     closeButtonElement.addEventListener('click', hideModal);

//     let titleElement = document.createElement('h1');
//     titleElement.innerText = title;

//     let contentElement = document.createElement('p');
//     contentElement.innerText = text;

//     modal.appendChild(closeButtonElement);
//     modal.appendChild(titleElement);
//     modal.appendChild(contentElement);
//     modalContainer.appendChild(modal);

//     modalContainer.classList.add('is-visible');

//     modalContainer.addEventListener('click', (e) => {
//       //Target the modal container only
//       let target = e.target;
//       if (target === modalContainer) {
//         hideModal();
//       }
//     });

//   }

//   document.querySelector('#show-modal').addEventListener('click', () => {
//     showModal('Modal Title', 'This is the modal content');
//   });

//   document.querySelector('#show-dialog').addEventListener('click', () => {
//     showDialog('Confirm action', 'Are you sure you want to do this?');
//   });

//   let dialogPromiseReject; //This can be set later, by showDialog

//   function hideModal() {
//     let modalContainer = document.querySelector('#modal-container');
//     modalContainer.classList.remove('is-visible');

//     if (dialogPromiseReject) {
//       dialogPromiseReject();
//       dialogPromiseReject = null;
//     }
//   }


//   function showDialog(title, text) {
//     showModal(title, text);

//     //Define the modalContainer here
//     let modalContainer = document.querySelector('#modal-container');

//     //Add confirm and cancel buttons to the modal
//     let modal = modalContainer.querySelector('.modal');

//     let confirmButton = document.createElement('button');
//     confirmButton.classList.add('modal-confirm');
//     confirmButton.innerText = 'Confirm';

//     let cancelButton = document.createElement('button');
//     cancelButton.classList.add('modal-cancel');
//     cancelButton.innerText = 'Cancel';

//     modal.appendChild(confirmButton);
//     modal.appendChild(cancelButton);

//     //Focus the confirmButton so user can simply press enter
//     confirmButton.focus();

//     document.querySelector('#show-dialog').addEventListener('click', () => {
//       showDialog('Confirm Action', 'Are you sure you wan to do this?').then(function () {
//         alert('Confirmed!');
//       }, () => {
//         alert('Not confirmed');
//       });
//     });

//     return new Promise((resolve, reject) => {
//       cancelButton.addEventListener('click', hideModal);
//       confirmButton.addEventListener('click', () => {
//         dialogPromiseReject = null; //Reset this
//         hideModal();
//         resolve();
//       });

//       //This can be used to reject from other functions
//       dialogPromiseReject = reject;
//     });
//   }

//   window.addEventListener('keydown', (e) => {
//     let modalContainer = document.querySelector('#modal-container');
//     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
//       hideModal();
//     }
//   });

//   //Return statement
// })();



//Exercise 1.8, real-time form validation code
// (function () {
//     let form = document.querySelector('#register-form');
//     let emailInput = document.querySelector('#email');
//     let passwordInput = document.querySelector('#password');

//     function showErrorMessage(input, message) {
//         let container = input.parentElement; //The .input-wrapper

//         //Check and remove any existing errors
//         let error = container.querySelector('.error-message');
//         if (error) {
//             container.removeChild(error);
//         }

//         //Now add the error if the message isn't empty
//         if (message) {
//             let error = document.createElement('div');
//             error.classList.add('error-message');
//             error.innerText = message;
//             container.appendChild(error);
//         }
//     }

//     function validateEmail() {
//         let value = emailInput.value;

//         if (!value) {
//             showErrorMessage(emailInput, 'Email is a required field');
//             return false;
//         }

//         if (value.indexOf('@') === -1) {
//             showErrorMessage(emailInput, 'Must enter a valid email address');
//             return false;
//         }

//         if (value.indexOf('.') === -1) {
//             showErrorMessage(emailInput, 'Must enter a valid email address');
//             return false;
//         }
//         showErrorMessage(emailInput, null);
//         return true;
//     }

//     function validatePassword() {
//         let value = passwordInput.value;

//         if (!value) {
//             showErrorMessage(passwordInput, 'Password is a required field');
//             return false;
//         }

//         if (value.length < 8) {
//             showErrorMessage(passwordInput, 'The password must be at least 8 characters long');
//             return false;
//         }

//         showErrorMessage(passwordInput, null);
//         return true;
//     }

//     function validateForm() {
//         let isValidEmail = validateEmail();
//         let isValidPassword = validatePassword();
//         return isValidEmail && validatePassword;
//     }

//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             alert('Success!');
//         }
//     })

//     emailInput.addEventListener('input', validateEmail);
//     passwordInput.addEventListener('input', validatePassword);

// })();



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


// Display the list of Pokemon w/ heights on the DOM via 'for' loop
// for (let i = 0; i < pokemonList.length; i++) {
//     document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
// // Adds message if Pokemon's height exceeds 1
//     if (pokemonList[i].height > 1) {
//         document.write(' - Wow, that\'s big!');
//     }
//     document.write("<br>");
// }

// // display list of pokemon names and heights using forEach method
// function pokemonDetails(pokemon) {
//     document.write(pokemon.name + ' (height: ' + pokemon.height + ')');

// // adds message if pokemon's height exceeds 1
//     if (pokemon.height > 1) {
//         document.write(' - Wow, that\'s a big one!');
//     }
//     document.write("<br>");
// }

// pokemonRepository.getAll().forEach(pokemon);
