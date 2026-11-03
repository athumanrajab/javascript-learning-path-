import view from "./view.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg"; //parcel way of getting all static files

class ResultsView extends view {
  _parentElement = document.querySelector(".results");
  _errorMessage =
    "No recipes found for your search. Please try a different keyword!";
  _successmessage = "";

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new ResultsView();
