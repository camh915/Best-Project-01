var showsApikey = "6f740c06220cb598e70409f4b591536e";
var baseUrl = "https://api.themoviedb.org/3";
var popularUrl = baseUrl + "/tv/popular?language=en-US&api_key=" + showsApikey;
var baseImageUrl = "https://image.tmdb.org/t/p/original/";
var searchResultsEl = $("#search-results");
var titles = [];

var SearchEL = document.getElementById("title-search");

function searchTvShow(searchText) {
  //creating API url for search based on searchtext.
  var searchUrl =
    baseUrl +
    "/search/tv?language=en-US&api_key=" +
    showsApikey +
    "&query=" +
    searchText;

  fetch(searchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      displaySearchResult(data.results);
    });
}

function displaySearchResult(results) {
  for (var i = 0; i < 5; i++) {
    var show = results[i];

    // create a card for the tv show
    var cardEl = document.createElement("div");
    $(cardEl).addClass("card");

    var cardBodyEl = document.createElement("div");
    $(cardBodyEl).addClass("card-body");

    // create a card title
    var cardTitleEl = document.createElement("h5");
    $(cardTitleEl).addClass("card-title");
    cardTitleEl.innerText = show.name;

    // create an element to show the poster and add it to the card body
    var posterEl = document.createElement("img"); //<img src="..."></img>
    var posterUrl = baseImageUrl + show.poster_path;
    posterEl.src = posterUrl;
    posterEl.height = 400;
    posterEl.width = 400;

    // add a button to go to show details page
    var buttonShowEl = document.createElement("btn"); //<button ></button>
    buttonShowEl.innerText = "Learn more about the show";
    $(buttonShowEl).addClass("btn btn-primary");
    var buttonCharEl = document.createElement("btn"); //<button ></button>
    buttonCharEl.innerText = "Learn more about the character";
    $(buttonCharEl).addClass("btn btn-primary");

    // add elements to card body
    cardBodyEl.append(cardTitleEl);
    cardBodyEl.append(posterEl);
    cardBodyEl.append(buttonShowEl);
    cardBodyEl.append(buttonCharEl);

    // add card body to card and the card to a container in html
    cardEl.append(cardBodyEl);
    searchResultsEl.append(cardEl);
  }
}

// adds saved series/show to saved list
function storeSavedTitles() {
  localStorage.setItem("titles", JSON.stringify(titles));
}

SearchEL.addEventListener("keypress", function (event) {
  //console.log(event); //It will console log the event object.
  if (event.key === "Enter") {
    //checking if pressed key is enter or not,we want to run the search only on enter.
    var searchText = event.target.value; //get value user entered in input box.
    //console.log("text searched ", searchText);

    // calling function to search for the tv show entered
    searchTvShow(searchText);
  }
});

var charactersButton = document.getElementById("characters-button");
var detailsButton = document.getElementById("details-button");

charactersButton.onclick = function () {
  document.location.href = "./characters.html";
};

detailsButton.onclick = function () {
  document.location.href = "./details.html";
};
