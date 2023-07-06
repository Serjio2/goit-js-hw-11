import GetImageAPI from './js/get-image';

const getimageApiInstance = new GetImageAPI();

const searchInputFormEl = document.querySelector('.search-form');
const createGalleryEl = document.querySelector('.gallery');


// console.log(galleryInfoEl);

searchInputFormEl.addEventListener('submit', heandleSearchBtn);

function heandleSearchBtn(event) {
  event.preventDefault();

  getimageApiInstance.query = event.target.elements.searchQuery.value;

  // console.log(getimageApiInstance.query);
  createGalleryEl.innerHTML = '';

  getimageApiInstance
    .getImage()
    .then(data => {
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
              <b>Likes${likes}</b>
            </p>
            <p class="info-item">
              <b>Views${views}</b>
            </p>
            <p class="info-item">
              <b>Comments${comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads${downloads}</b>
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
    })
    .catch(() => {
      console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}
