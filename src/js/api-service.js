import axios from "axios";

export default class NewsApiService {
	constructor() {
		this.searchQuery = '';
		this.page = 1;
		this.totalHits = '';
	}

	async fetchArticles() {
		const API_KEY = '22683301-b01030d0df8a1fa2bda925efb';
		const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
		const response = await axios.get(URL);
		this.page += 1;
		return response.data;
	}

	resetPage() {
		this.page = 1;
	};

	get query() {
		return this.searchQuery;
	}

	set query(newQuery) {
		this.searchQuery = newQuery;
	}
}