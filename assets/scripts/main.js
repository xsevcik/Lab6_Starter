// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  'assets/recipes/eggnog.json',
  'assets/recipes/mashed-potatoes.json',
  'assets/recipes/pumpkin-pie.json'
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {}

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };
  // Add the first three recipe cards to the page
  createRecipeCards();
  // Make the "Show more" button functional
  bindShowMore();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    // This function is called for you up above
    // From this function, you are going to fetch each of the recipes in the 'recipes' array above.
    // Once you have that data, store it in the 'recipeData' object. You can use whatever you like
    // for the keys. Once everything in the array has been successfully fetched, call the resolve(true)
    // callback function to resolve this promise. If there's any error fetching any of the items, call
    // the reject(false) function.

    // For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
    // in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.
    for (let i in recipes) {
      fetch(recipes[i])
        .then(response => response.json())
        .then(data => recipeData[i] = data)
        .catch(error => {
          console.log(error);
          reject(false);
        });
    }
    setTimeout(() => {if (recipes.length == Object.keys(recipeData).length) {
      resolve(true);
    }
    }, 300);
  });
}

function createRecipeCards() {
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  for (let entry = 0; entry < 3; entry++) {
    let card = document.createElement('recipe-card');
    card.data = recipeData[entry];
    let main = document.getElementsByTagName('main');
    main[0].appendChild(card.shadowRoot);
    
  }
}

function bindShowMore() {
  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/
  var showMoreExpanded = false;
  let showMoreButton = document.getElementsByTagName('button');
  let main = document.getElementsByTagName('main');
  showMoreButton[0].addEventListener('click', () => {
    if (showMoreExpanded) {
      for (let i = 0; i < 5; i++) {
        main[0].removeChild(main[0].childNodes[(main[0].childNodes.length)- 1]);
      }
      showMoreExpanded = false;
      showMoreButton[0].textContent = "Show more";
    } else {
      for (let i = 3; i < 6; i++) {
        let card = document.createElement('recipe-card');
        card.data = recipeData[i];
        main[0].appendChild(card.shadowRoot);
      }
      showMoreExpanded = true;
      showMoreButton[0].textContent = "Show less"
    }
  });
}





// comment to stop trunc   