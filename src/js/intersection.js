import '../sass/main.scss';
import ImageApiService from './images-api';
const imageApiService = new ImageApiService();
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const lightbox = new SimpleLightbox('.image-list a', { captionsData: 'alt', captionDelay: 250, captionPosition: 'bottom' });

import { getRefs } from './refs.js'

const {imageList, footer} = getRefs();

import markup from './templates/images.hbs';

let page = 0;

const observer = new IntersectionObserver(onEntry, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
});

function onEntry(entries, observer) {
    
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            page += 1;
            markupImages(page);
        }
        // console.log(entry)
    })
}

observer.observe(footer);


imageApiService.searchQuery = 'nature';


function renderImages(images) {

    imageList.insertAdjacentHTML('beforeend', markup(images));
    lightbox.refresh();
    const imagesAll = document.querySelectorAll('img');
    lazyLoad(imagesAll);
    console.log(imagesAll);
};

function lazyLoad(targets) {
    const option = {
        rootMargin: '100px'
    }
    const onEntry = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const images = entry.target;
                console.log(images);
                const src = images.dataset.lazy;
                images.src = src;
                
                observer.unobserve(images);
            }
            
        })
    }
    
    const io = new IntersectionObserver(onEntry, option);
    targets.forEach(target => {
        io.observe(target);
    })

}


async function markupImages(page) {
    const data = await imageApiService.getImages(page);

    // console.log(data.hits)
    renderImages(data.hits);
}
