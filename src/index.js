import {getImage} from './js/get-image';

const searchInputFormEl = document.querySelector('.search-form');

console.log(searchInputFormEl);


searchInputFormEl.addEventListener('submit', heandleSearchBtn);


function heandleSearchBtn(event) {
event.preventDefault();
const value = event.target[0].value;

getImage();

console.log(value);

}; 
