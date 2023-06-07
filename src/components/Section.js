export default class Section {
  constructor(selector) {
    this._container = document.querySelector(selector);
  }

  init({items, renderer}){
    this._items = items;
    this._renderer = renderer;
  }

  renderItems() {
    this._items.forEach(this._renderer);
  }

  addItem(itemHtml) {
    this._container.prepend(itemHtml);
  }
}