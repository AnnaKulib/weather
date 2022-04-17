export const getRefs = () => {
    return {
        timeZone: document.querySelector('.location-timezone'),
        degree: document.querySelector('.temperature-degree'),
        description: document.querySelector('.temperature-description'),
        footer: document.querySelector('footer'),
        imageList: document.querySelector('.image-list'),
        form: document.querySelector('.search-form')
    }
}