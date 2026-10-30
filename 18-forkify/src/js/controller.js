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
    // alert(err);
    console.error(err);
  }
};
// showRecipe();

// TODO: Listening for load and hashchange events
const events = ["hashchange", "load"];
events.forEach((event) => window.addEventListener(event, controlRecipes));
