import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

import "core-js/stable"; //Polyfilling modern js features such as Promise.allSettled([...]);
import "regenerator-runtime/runtime"; //Polyfilling async await

// TODO: Enable hot reloading
if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector(".recipe");

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;

    // NOTE: Calling the renderSpinner()
    recipeView.renderSpinner();

    // NOTE: Loading recipe which was the function imported from model.js
    await model.loadRecipe(id);

    // NOTE: Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
// showRecipe();

// NOTE: Event handlers in MVC: Publisher-Subscriber pattern
// This is how we implement event listener and event handlers in MVC pattern
// Publisher - codes that knows when to react
// Subcriber - Codes that should be executed when the event happen
// Solution: We can subscribe to the publisher by passing into subscriber function as an argument

// TODO: Implementing search results - Part 1 - the loadSearchResults() is handled here
const controlSearchResults = async function () {
  try {
    // Render spinner while waiting for the search results
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();

    if (!query) return;

    // Load search results based on the passed query
    await model.loadSearchResults(query);

    //Render result
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.error(error);
  }
};

// TODO: Implement an init() that will help us use the Publisher-Subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
