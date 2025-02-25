class searchView {
  _parentEL = document.querySelector('form.search');
  _inputEl = document.querySelector('input.search__field');

  getQuery() {
    const query = this._inputEl.value;
    // this._clearView();
    return query;
  }

  _clearView() {
    this._inputEl.value = '';
  }

  addHandlerSearch(handler) {
    this._parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
