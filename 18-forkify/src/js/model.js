import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

// TODO: loading Recipe
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    // console.log(recipe);

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(recipe);
  } catch (error) {
    throw error;
  }
};

// TODO: Implementing search results - Part 1 (Without pagination)
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    // NOTE: Lets create a new array by using map
    state.search.results = data.data.recipes.map((dt) => {
      return {
        id: dt.id,
        image: dt.image_url,
        title: dt.title,
        publisher: dt.publisher,
      };
    });
  } catch (error) {
    console.error(`Oppps 💩: ${error}`);
    throw error;
  }
};
