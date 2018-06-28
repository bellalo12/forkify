export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchRes: document.querySelector('.results'),
  searchResList: document.querySelector('.results__list'),
  searchResPages: document.querySelector('.results__pages')

}

//3 -> create loading spinner
/* put the class in the central place (create new object elementStrings) like we done in elements object*/
export const elementStrings = {
  loader: 'loader'
};

//1 -> create loading spinner
export const renderLoader = parent =>{
  const loader = `
       <div class='${elementStrings.loader}'>
         <svg>
           <use href='img/icons.svg#icon-cw'></use>
         </svg>
       </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};



//2 -> create loading spinner
/* cuz by the time this code runs, the loader is not yet on the page.
So we cant select anything is not yet there. That's why we need to do document.querySelector here */
export const clearLoader = () =>{
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if(loader) loader.parentElement.removeChild(loader);    //delete element from DOM
};
