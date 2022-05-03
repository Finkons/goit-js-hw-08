import { galleryItems } from './gallery-items';

import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

const makeGalleryItems = element => {
  const { preview, original, description } = element;
  return `<li><a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" /> </a></li>`;
};
const gallery = document.querySelector('.gallery');
const makeGallery = galleryItems.map(makeGalleryItems).join('');
gallery.innerHTML = makeGallery;

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});
console.log(galleryItems);
