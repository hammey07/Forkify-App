import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helper';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  //loading recipe
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    // console.log(data);
    let recipe = data.data.recipe;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.log('Hambad - Error in model file', err);
  }

  // const res = await fetch(`${API_URL}/${id}`);
  // const data = await res.json();
  // if (!res.ok) throw new Error(`${data.message}`);

  // console.log(state.recipe);
};
