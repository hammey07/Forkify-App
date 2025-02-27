import View from './View.js';
import icons from 'url:/icons.svg';
class bookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _successMessage;
  _errorMessage = 'No Bookmarks yet. Find a recipe and bookmark!';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
    <a class="preview__link ${
      result.id === id ? 'preview__link--active' : ''
    }" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="${result.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
      <div class="preview__user-generated 
        ${result.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
        </div>
    </a>
    </li>`;
  }
}

export default new bookmarksView();
