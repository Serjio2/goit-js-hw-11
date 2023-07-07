const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38070377-8dbe611b16263765ee807d393';

// const qwery = null; 
const imageType = 'photo';
const orientation = 'horizontal'
const safesearch = true;


 export default class GetImageAPI {
  constructor () {
    this.searchQuery = '';
  }

 getImage() {
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}&per_page=40`)
  .then((response) => {
    if (!response.ok) {
        throw new Error(response.status)
    }
    return response.json();
    })
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}


