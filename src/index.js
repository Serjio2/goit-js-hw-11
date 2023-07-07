import { Notify } from 'notiflix/build/notiflix-notify-aio';
import GetImageAPI from './js/get-image';

const getimageApiInstance = new GetImageAPI();

const searchInputFormEl = document.querySelector('.search-form');
const createGalleryEl = document.querySelector('.gallery');


// console.log(searchInputFormEl.searchQuery);

searchInputFormEl.addEventListener('submit', heandleSearchBtn);

function heandleSearchBtn(event) {
  event.preventDefault();

  getimageApiInstance.query = event.target.elements.searchQuery.value;

  // console.log(getimageApiInstance.query);
  createGalleryEl.innerHTML = '';

  getimageApiInstance
    .getImage()
    .then(data => {
    //   if (Object.keys(data).length === 0) {
    //     console.log('пуст');
    // }
      for (const item of data.hits) {
        const {
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        } = item;

        createGalleryEl.insertAdjacentHTML(
          'beforeend',
          `
          <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          
          <div class="info">
            <p class="info-item">
              <b>Likes<span class="info-number">${likes}</span></b>
            </p>
            <p class="info-item">
              <b>Views<span class="info-number">${views}</span></b>
            </p>
            <p class="info-item">
              <b>Comments<span class="info-number">${comments}</span></b>
            </p>
            <p class="info-item">
              <b>Downloads<span class="info-number">${downloads}</span></b>
            </p>
          </div>
        </div>
        `
        );

        // const galleryInfoEl = document.querySelector('.info');
        // galleryInfoEl.classList.add('card-info')
        // console.log(galleryInfoEl);
        // console.log(item);

      }
      searchInputFormEl.searchQuery.value = '';
    })
    .catch(() => {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      // console.log(
        // 'Sorry, there are no images matching your search query. Please try again.'
      // );
    });
}
