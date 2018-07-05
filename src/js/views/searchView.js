import {elements} from './base';

//1
export const getInput = () => elements.searchInput.value;

//5
export const clearInpupt = () =>{
  elements.searchInput.value = '';
}


//6
export const clearResults = () =>{
  elements.searchResList.innerHTML ='';
  elements.searchResPages.innerHTML='';
}

//9
export const highlightSelected = id =>{
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.map(el=>{
    return el.classList.remove('results__link--active');
  })
  document.querySelector(`.results__link[href="#${id}"]`).classList.add(`results__link--active`)
}



//3
export const renderRecipe = recipe =>{
  const markup = `
      <li>
          <a class="results__link" href="#${recipe.recipe_id}">
              <figure class="results__fig">
                  <img src="${recipe.image_url}" alt="${recipe.title}">
              </figure>
              <div class="results__data">
                  <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                  <p class="results__author">${recipe.publisher}</p>
              </div>
          </a>
      </li>
  `;
  elements.searchResList.insertAdjacentHTML('beforeend', markup)
}

//8 type 'prev' or 'next'  create button function for renderButtons use
    /* in button we also use a dataset -> data-goto for eventlistener use */
const createButton = (page, type) => `
     <button class="btn-inline results__btn--${type}" data-goto=${type==='prev' ? page-1 : page+1}>
          <span>Page ${type==='prev' ? page-1 : page+1}</span>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
          </svg>
      </button>
`;


//7
/* page 是頁數 / pages 是總頁數 */ //cuz we will use the same buttons to html code so create outside function to be central use

const renderButtons =(page, numResults, resPerPage) =>{ //in this case we have numResults = 30 and would like to resPerPage 10/perpage
  const pages = Math.ceil(numResults/resPerPage);   //if 4.5 -> 5 / 4.1 ->5

  let button;
  if(page === 1 && pages >1){  //頁數1,且總頁數超過1頁
    //Button to next page
    button = createButton(page, 'next');

  } else if (page < pages){  //頁數小於總頁數, 例如全部共 3頁, 現在在第 2頁
    //Both button
    button =`
       ${createButton(page, 'prev')}
       ${createButton(page, 'next')}
    `;

  } else if (page === pages && pages >1){  //共3頁,現在在第三頁, 因為總共不只有1頁所以有prev鍵
    //Button to prev page
    button = createButton(page, 'prev');
  }
  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};


//2 -> recipes.forEach(renderRecipe) + 7 ->(render 10 results per page to create render button)
/* not only render recipe but also to render the page and resicpe per page */
/* var num = ['101', '102', '103' , '104', '105']
   console.log( num.slice(1,3))    //['102', '103']
   console.log(num.slice(0, 5))    //['101', '102', '103' , '104', '105']
*/
export const renderResults = (recipes, page=1, resPerPage=10) =>{
  //render result of current page
  const start = (page-1) * resPerPage;     //Page1 will start at 10 Page2 will start at 20
  const end = page * resPerPage;           //Not include the end number(10) but 0-9 total 10

  recipes.slice(start, end).forEach(renderRecipe);

  //render pagination buttons
  renderButtons(page, recipes.length, resPerPage);
};



//4
const limitRecipeTitle = (title, limit = 17) =>{
  const newTitle=[];
  if(title.length > limit){
    title.split(' ').reduce((acc, cur)=>{
      if(acc + cur.length <= limit){
        newTitle.push(cur);
      }
      return acc + cur.length;

    },0)
    return `${newTitle.join(' ')}...`
  } else {
    return title;
  }
}
