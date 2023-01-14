var showsApikey = "6f740c06220cb598e70409f4b591536e";
var baseUrl = "https://api.themoviedb.org/3";
var popularUrl = baseUrl + "/tv/popular?language=en-US&api_key=" + showsApikey;
var baseImageUrl = "https://image.tmdb.org/t/p/original/";
var searchResultsEl = $("#search-results");
var savedList = document.querySelector("#saved-list");
var titles = [];

var SearchEL = document.getElementById("title-search");

var btnContainer = document.querySelector(".list-group");

var savedBtns = btnContainer.getElementsByClassName("a");

init();

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
      console.log(data);
      displaySearchResult(data.results);
      howManySeasons(data.results[0].id);
    });
}

function displaySearchResult(results) {
  $(searchResultsEl).empty(); //fix search result render
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
    posterEl.height = 200;
    posterEl.width = 200;

    // add a button to go to show details page
    var buttonShowEl = document.createElement("btn"); //<button ></button>
    buttonShowEl.innerText = "Learn more about the show";
    $(buttonShowEl).addClass("btn btn-primary btn-show");
    var buttonCharEl = document.createElement("btn"); //<button ></button>
    buttonCharEl.innerText = "Learn more about the character";
    $(buttonCharEl).addClass("btn btn-primary btn-char");

    var buttonBingeEl = document.createElement("btn"); //<button ></button>
    buttonBingeEl.innerText = "How long to watch?";
    $(buttonBingeEl).addClass("btn btn-primary");

    // add elements to card body
    cardBodyEl.append(cardTitleEl);
    cardBodyEl.append(posterEl);
    cardBodyEl.append(buttonShowEl);
    cardBodyEl.append(buttonCharEl);
    cardBodyEl.append(buttonBingeEl);

    // add card body to card and the card to a container in html
    cardEl.append(cardBodyEl);
    searchResultsEl.append(cardEl);
  }
  addClickHandler();
}

// console.log(popularShows());

function popularShows() {
  fetch(popularUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayPopularShows(data.results)
    });
}



function displayPopularShows(results) {
  console.log(results)
  for (var i = 0; i < 3; i++) {
    var show = results[i];

    // create a card for the tv show
    var cardEl = document.getElementsByClassName('card')[i]

    var cardBodyEl = cardEl.children[1];

    // create a card title
    var cardTitleEl = cardBodyEl.children[0];

    cardTitleEl.innerText = show.name;

    // create an element to show the poster and add it to the card body
    var posterEl = cardEl.children[0]; //<img src="..."></img>
    var posterUrl = baseImageUrl + show.poster_path;

    posterEl.src = posterUrl;
    posterEl.height = 200;
    posterEl.width = 200;

    // add a button to go to show details page
    var buttonShowEl = document.createElement("btn"); //<button ></button>
    buttonShowEl.innerText = "Learn more about the show";
    $(buttonShowEl).addClass("btn btn-primary btn-show");
    var buttonCharEl = document.createElement("btn"); //<button ></button>
    buttonCharEl.innerText = "Learn more about the character";
    $(buttonCharEl).addClass("btn btn-primary btn-char");

    var buttonBingeEl = document.createElement("btn"); //<button ></button>
    buttonBingeEl.innerText = "How long to watch?";
    $(buttonBingeEl).addClass("btn btn-primary");

    // add elements to card body
    // cardBodyEl.append(cardTitleEl);
    // cardBodyEl.append(posterEl);
    cardBodyEl.append(buttonShowEl);
    cardBodyEl.append(buttonCharEl);
    cardBodyEl.append(buttonBingeEl);

    // add card body to card and the card to a container in html
    // cardEl.append(cardBodyEl);
    // searchResultsEl.append(cardEl);
  }
}

// adds saved series/show to saved list
function storeSavedTitles() {
  localStorage.setItem("titles", JSON.stringify(titles));
}

// adds the saved titles to the saved list
function renderTitles() {
  savedList.innerHTML = "";

  console.log(titles);
  for (var i = 0; i < titles.length; i++) {
    var a = document.createElement("a"); //<a></a>
    a.setAttribute("class", "list-group-item list-group-item-action");
    // href # is placeholder
    a.setAttribute("href", "#");
    a.innerText = titles[i];

    savedList.append(a);
  }
}

// displays the saved list when page initializes
function init() {
  var storedTitles = JSON.parse(localStorage.getItem("titles"));
  console.log(storedTitles)

  if (storedTitles !== null) {
    console.log('titles saved')
    titles = storedTitles;
  }

  renderTitles();
  popularShows();
}

SearchEL.addEventListener("keypress", function (event) {
  //console.log(event); //It will console log the event object.
  if (event.key === "Enter") {
    //checking if pressed key is enter or not,we want to run the search only on enter.
    var searchText = event.target.value; //get value user entered in input box.
    //console.log("text searched ", searchText);
    event.target.value = "";

    // store the searched text in titles array and save the data to localStorage
    titles.push(searchText);
    storeSavedTitles();
    console.log(titles);

    // calling function to search for the tv show entered
    searchTvShow(searchText);
  }
});

//var  = document.getElementById("characters-button");
//var detailsButton = document.getElementById("details-button");
function addClickHandler() {
  $(".btn-char").on("click", function () {
    console.log("btnclick");
    document.location.href = "./characters.html";
  });

  $(".btn-show").on("click", function () {
    console.log("btnclick");
    document.location.href = "./details.html";
  });
}

function howManySeasons(tvId) {
  var howManySeasonsUrl = baseUrl + "/tv/" + tvId + "?api_key=6f740c06220cb598e70409f4b591536e&language=en-US";
 
  fetch(howManySeasonsUrl)
.then(function (response) {
  console.log(response);
  return response.json();
})
.then(function(data) {
  console.log(data);
  console.log(data.seasons);
  console.log(data.seasons.length);
  howManyEpisodes(data.seasons.length);
}
);
}
 
// for each season of the show, find how many episodes there are
function howManyEpisodes(seasonNumbers) {
 
  for (var i = 1; i < seasonNumbers + 1; i++) {
    var howManyEpisodesUrl = baseUrl + "/tv/65495/season/" + [i] + "?api_key=6f740c06220cb598e70409f4b591536e&language=en-US";
 
  fetch(howManyEpisodesUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    runTimes(data.episodes);
  });
}
}
 
var totalRunTime = [];
// get the runtimes for each episode
function runTimes(episodes) {
  for (var i = 0; i < episodes.length; i++) {
   console.log(episodes[i].runtime);
   totalRunTime.push(episodes[i].runtime);
  }
  console.log(totalRunTime);
  var sum = 0;
 
  for (var i = 0; i < totalRunTime.length; i++) {
    sum += totalRunTime[i];
  }
 
  console.log(sum)
}

