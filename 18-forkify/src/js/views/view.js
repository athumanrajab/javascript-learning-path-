import icons from "url:../../img/icons.svg"; //parcel way of getting all static files

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    // Getting rid of any content including the welcome message
    this._clear();
    // Insert our html markup
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    // NOTE: Convert the markup string to the DOM object that is living in the memory so that we can then use to compare it with the actual DOM that's in the page
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*"),
    );

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update change attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value),
        );
      }
    });
  }

  // TODO: Clearing recipe container
  _clear() {
    this._parentElement.innerHTML = "";
  }

  // TODO: Render a loading spinner
  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // TODO: Implementing errors and success messages
  renderError(message = this._errorMessage) {
    const markup = `
              <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
    // Getting rid of any content including the welcome message
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderMessage(message = this._successMessage) {
    const markup = `
              <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
    // Getting rid of any content including the welcome message
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
