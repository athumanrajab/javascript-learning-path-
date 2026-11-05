import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, API_KEY } from "./config.js";
// import { getJSON, sendJSON } from "./helpers.js";
import { AJAX } from "./helpers.js";

import "core-js/stable";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  // console.log(recipe);

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), //Conditionally include the recipe key if it exists.
  };
};

// TODO: loading Recipe
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);

    state.recipe = createRecipeObject(data);

    // console.log(recipe);
    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (error) {
    throw error;
  }
};

// TODO: Implementing search results - Part 1 (Without pagination)
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

    // NOTE: Lets create a new array by using map
    state.search.results = data.data.recipes.map((dt) => {
      return {
        id: dt.id,
        image: dt.image_url,
        title: dt.title,
        publisher: dt.publisher,
        ...(dt.key && { key: dt.key }),
      };
    });

    // Reset the default page to 1 after loading the search result
    state.search.page = 1;
  } catch (error) {
    console.error(`Oppps 💩: ${error}`);
    throw error;
  }
};

// TODO: Implementing pagination
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

// TODO: Update recipe servings
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    // Formula used: newQuantity = oldQuantity * newServings / oldServing
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

// TODO: Persist data in local storage
const persistBookmarks = function () {
  localStorage.setItem("bookmark", JSON.stringify(state.bookmarks));
};

// TODO: Implementing add bookmarking feature
export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  persistBookmarks();
};

// TODO: Implementing remove bookmarking feature
export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookmark");
  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
};

init();

// NOTE: A function that will help clearing the bookmarks during development
const clearBookmarks = function () {
  localStorage.clear("bookmark");
};
clearBookmarks();

// TODO: A function to upload recipe in the API

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((el) => el.trim());
        // const ingArr = ing[1].replaceAll(" ", "").split(",");
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient format! Please use the correct format",
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
