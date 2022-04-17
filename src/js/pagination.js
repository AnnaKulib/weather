import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import markup from './templates/images';
import ImageApiService from './images-api';

const imageApiService = new ImageApiService();
import { getRefs } from './refs';

const { form, imageList } = getRefs();

form.addEventListener('submit', onFormSubmit);

const options = {
    totalItems: 0,
    itemsPerPage: 5,
    visiblePages: 5,
    page: 1,
};

const pagination = new Pagination('.tui-pagination', options);


const page = pagination.getCurrentPage();
// console.log(page);

async function fetchImages(page) {
    const BASE_URL = `https://pixabay.com/api/?key=26561926-b4a1cd5696abc50a17fae36e8`;

   
    const url = `${BASE_URL}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${page}`;

    try {
        const response = await fetch(url);
        const img = await response.json();

        return img;
        

    } catch (error) {
        console.log(error.message);
    }

};

async function initPage() {
try {
    const  data = await fetchImages(page);
    pagination.reset(data.totalHits);
renderImages(data.hits)

console.log(data);
} catch (error) {
    
}
};

initPage();



// fetchImages(page).then(data => {
//     pagination.reset(data.totalHits);
// renderImages(data.hits)
// });



async function popular(event) {
    const data = await fetchImages(event.page);
renderImages(data.hits)
}

async function afterUserInput(event) {
    const data = await imageApiService.getImages(event.page);
    renderImages(data.hits);

}

pagination.on('afterMove', popular);
console.dir(pagination);

function renderImages(images) {

    imageList.insertAdjacentHTML('beforeend', markup(images));
};


async function onFormSubmit(evt) {
    evt.preventDefault();
    const inputValue = evt.currentTarget.elements.searchQuery.value;

    imageApiService.searchQuery = inputValue;
    

    imageList.innerHTML = '';
    pagination.off('afterMove', popular);


    // console.log(inputValue);
    // const data = await searchByUserRequest(inputValue);
    // console.log(data);
    // renderImages(data.hits);
    // pagination.reset(data.totalHits);
    const data = await imageApiService.getImages(page);
    renderImages(data.hits);
        pagination.reset(data.totalHits);


        pagination.on('afterMove', afterUserInput);

    form.reset();
    

};

async function searchByUserRequest(searchQuery) {
 const BASE_URL = `https://pixabay.com/api/?key=26561926-b4a1cd5696abc50a17fae36e8`;

   
    const url = `${BASE_URL}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${page}`;

    try {
        const response = await fetch(url);
        const img = await response.json();

        return img;
        

    } catch (error) {
        console.log(error.message);
    }
}