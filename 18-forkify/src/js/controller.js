import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable"; //Polyfilling modern js features such as Promise.allSettled([...]);
import "regenerator-runtime/runtime"; //Polyfilling async await

const recipeContainer = document.querySelector(".recipe");

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

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

// TODO: Implement an init() that will help us use the Publisher-Subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
