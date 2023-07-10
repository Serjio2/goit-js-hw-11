import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import GetImageAPI from './js/get-image';
import { createGalleryCard } from './js/create-image';

const getimageApiInstance = new GetImageAPI();
const lightboxGallery = new SimpleLightbox('.gallery a');

const searchInputFormEl = document.querySelector('.search-form');
const createGalleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

searchInputFormEl.addEventListener('submit', heandleSearchBtn);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);

async function heandleSearchBtn(event) {
  event.preventDefault();

  getimageApiInstance.query = event.target.elements.searchQuery.value.trim();

  loadMoreBtnEl.classList.remove('is-hidden');

  if (getimageApiInstance.query === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  getimageApiInstance.resetPage();

  createGalleryEl.innerHTML = '';

  const data = await getimageApiInstance.getImage();
  try {
    if (data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtnEl.classList.remove('is-hidden');
      return;
    }

    Notify.success(`Hooray! We found ${data.totalHits} images.`);

    const murkup = createGalleryCard(data.hits);
    createGalleryEl.insertAdjacentHTML('beforeend', murkup);
    lightboxGallery.refresh();
    loadMoreBtnEl.classList.add('is-hidden');
  } catch {
    Notify.failure('Bad request');
  }
}

async function handleLoadMoreBtnClick() {
  getimageApiInstance.incrementPage();
  const data = await getimageApiInstance.getImage();
  try {
    if (getimageApiInstance.page >= data.totalHits / 40) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );

      loadMoreBtnEl.classList.remove('is-hidden');
      return;
    }

    murkup = createGalleryCard(data.hits);
    createGalleryEl.insertAdjacentHTML('beforeend', murkup);
    lightboxGallery.refresh();
  } catch {
    Notify.failure('Bad request end line');
  }
}
