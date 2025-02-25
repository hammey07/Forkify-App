import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helper';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  //loading recipe
  try {
    const data = await getJSON(`${API_URL}${id}`);
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

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.log('Hambad - Error in model file', err);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    state.search.page = 1;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.log('Hambad - Error in loadsearch res function file', err);

    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; //9;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings  // 2* 8/4 =4
  });

  state.recipe.servings = newServings;
};

const saveBookmarksToStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  //mark cur recipe as bookmarked
  if (recipe.id == state.recipe.id) state.recipe.bookmarked = true;
  saveBookmarksToStorage();
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id == state.recipe.id) state.recipe.bookmarked = false;
  //mark cur recipe as not bookmarked
  // if (recipe.id == state.recipe.id) state.recipe.bookmarked = true;
  saveBookmarksToStorage();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
  console.log(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const newRecipeArr = Object.entries(newRecipe);
    newRecipe.ingredients;
    const ingredients = newRecipeArr
      .filter(ing => ing[0].startsWith('ingredient') && ing[1] !== '')
      .map(ing => {
        const ingArr = ing[1];
        if (ingArr.length != 3)
          throw new Error('Wrong Ingredient format, please use correct format');
        const [qty, unit, description] = ingArr.replaceAll(' ', '').split(',');
        return { qty: qty ? qty : null, unit, description };
      });
    console.log(ingredients);
  } catch (err) {
    throw err;
  }

  // const ingredients = Object.entries(newRecipe)
  //   .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
  //   .map(ing => {
  //     const [qty, unit, description] = ing[1].replaceAll(' ', '').split(',');
  //     return qty, unit, description;
  //   });
  // console.log(ingredients);
};
uploadRecipe();
