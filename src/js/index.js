import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
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


    //3 Create new recipe object
    state.recipe = new Recipe(id);


    try{
      //4 Get recipe data and parseIngredient
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();

      //5 Render recipe
      console.log(state.recipe)
    } catch(err){
      alert('Error processing recipe!!!!!')
    }

  }

}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
//
// // /* if we reload the page, nothing will happen.  Because this only happens
// // whenever the hash actually change.  But if user save this URL here as a bookmark
// // and then when he comes back nothing will really happen. So we need to add a
// // eventlistener to load event */
