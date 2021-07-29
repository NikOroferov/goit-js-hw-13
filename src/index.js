import './css/styles.css';
import '../node_modules/simplelightbox/src/simple-lightbox.scss';
import NewApiService from './js/api-service.js';
import cardMarkup from './templates/cardsMarkup.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

var lightbox = new SimpleLightbox('.gallery a');

const newApiService = new NewApiService();
console.log(newApiService);

formEl.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoad);

loadMoreBtn.classList.add('is-hidden');

async function onSearch(event) {
	event.preventDefault();
	newApiService.query = event.currentTarget.elements.searchQuery.value.trim('');

	try {
		const result = await newApiService.fetchArticles();
		if (newApiService.query === '' || result.hits.length === 0) {
			clearGallery();
			loadMoreBtn.classList.add('is-hidden');
			Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
		}
		else if (result.hits.length !== 0) {
			clearGallery();
			Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);

      appendCardsMarkup(result.hits);

			lightbox.refresh();
			loadMoreBtn.classList.remove('is-hidden');
		}
	} catch (error) {
		console.log(error);
	}
}

async function onLoad() {
	try {
		const result = await newApiService.fetchArticles();
		appendCardsMarkup(result.hits);
		const hitsLength = galleryEl.querySelectorAll('.photo-card').length;

		if (hitsLength >= result.totalHits) {
			Notiflix.Notify.failure("We are sorry, but you have reached the end of search results.");
			loadMoreBtn.classList.add('is-hidden');
		} else {
			lightbox.refresh();
		}
	} catch (error) {
		console.log(error);
	}
}


function clearGallery () {
    galleryEl.innerHTML = '';
}

function appendCardsMarkup(data){
 galleryEl.insertAdjacentHTML('beforeend', cardMarkup(data));
};