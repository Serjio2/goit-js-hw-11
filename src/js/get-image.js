const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38070377-8dbe611b16263765ee807d393';

const qwery = null;
const imageType = 'photo';
const orientation = 'horizontal'
const safesearch = true;



function getImage() {
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${qwery}&image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}`)
  .then((response) => {
    if (!response.ok) {
        throw new Error(response.status)
    }
    return response.json()
  })

// console.log('I`m fetch');
}


export { getImage, qwery };
