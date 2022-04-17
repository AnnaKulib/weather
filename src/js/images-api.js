const BASE_URL = 'https://pixabay.com/api/?key=26561926-b4a1cd5696abc50a17fae36e8';

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
}

    async getImages(page) {
        // console.log(this);
        const url = `${BASE_URL}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${page}`;

        try {
    const response = await fetch(url);
    
            return await response.json();

            
  } catch (error) {
            console.error(error.message);
        }

    }

    
        

    get query() {
        return this.searchQuery;
    }

set query(newQuery) {
    this.searchQuery = newQuery;
    }

}