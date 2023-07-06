
import { getImage, qwery } from './js/get-image';


const searchInputFormEl = document.querySelector('.search-form');

console.log(searchInputFormEl);


searchInputFormEl.addEventListener('submit', heandleSearchBtn);


function heandleSearchBtn(event) {
    event.preventDefault();
    
    qwery = event.target[0].value;
    
  console.log(qwery)
  

  getImage().then(data => {

    for(const item of data.hits) {

        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = item;

    // console.log(webformatURL)
    }

  
    }
  )
}

