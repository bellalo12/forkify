import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements,renderLoader,clearLoader} from './views/base';



const state = {}

/****
SEARCH CONTROLLER
****/
const controlSearch = async() =>{

  //1. Get query from view
  const query = searchView.getInput();


  if(query){
    //2. Create new search object and add to state
    state.search = new Search(query);

    //3. Prepare UI for results
    searchView.clearInpupt();
    searchView.clearResults();
    renderLoader(elements.searchRes);  //pass parent element elements.searchRes to renderLoader()

    //4. Search for recipes
    await state.search.getResults();

    //5. Render result on UI
    clearLoader();
    searchView.renderResults(state.search.result)
  }
}


elements.searchForm.addEventListener('submit', e=>{
  e.preventDefault();
  controlSearch();
})



elements.searchResPages.addEventListener('click', e=>{  /* use closest to click button element itself no any other child elements spang/svg */
  const btn = e.target.closest('.btn-inline');
  if(btn){
    const goToPage = parseInt(btn.dataset.goto,10);   //convert it to number and based 10(0-9)
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
})


/***
RECIPE CONTROLLER
***/

const controlRecipe = async()=>{
  //1 Get ID from url
  const id = window.location.hash.replace('#', '');

  if(id){
    //2 Prepare UI for change
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    //3 Highlight selected search item
    if(state.search) searchView.highlightSelected(id);     /* use if statement to show if there was a search, then one of the search item can be selected */


    //4 Create new recipe object
    state.recipe = new Recipe(id);


    try{
      //5 Get recipe data and parseIngredient
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();

      //6 Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);

    } catch(err){
      alert('Error processing recipe!!!!!')
    }
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
//
// // /* if we reload the page, nothing will happen.  Because this only happens
// // whenever the hash actually change.  But if user save this URL here as a bookmark
// // and then when he comes back nothing will really happen. So we need to add a
// // eventlistener to load event */




elements.recipe.addEventListener('click', e=>{
      //Decrease button is clicked
   if(e.target.matches('.btn-decrease, .btn-decrease *')){
     /* .btn-decrease * means include its child elements such as <svg> <use> */

     if(state.recipe.servings > 1){
         state.recipe.updateServings('dec');
         recipeView.updateServingsIngredients(state.recipe)
     }
   } else if(e.target.matches('.btn-increase, .btn-increase *')){
     // Increase button is clicked
     state.recipe.updateServings('inc');
     recipeView.updateServingsIngredients(state.recipe)
   } 
 })
