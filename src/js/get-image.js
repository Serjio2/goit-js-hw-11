import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = '38070377-8dbe611b16263765ee807d393';



const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38070377-8dbe611b16263765ee807d393';


const imageType = 'photo';
const orientation = 'horizontal'
const safesearch = true;


 export default class GetImageAPI {
  constructor () {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

 getImage() {
  // console.log(this);
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}&per_page=${this.perPage}&page=${this.page}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.status)
    }
    return response.json();
  })
  
}

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}


