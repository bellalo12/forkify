import Search from './models/Search';
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
