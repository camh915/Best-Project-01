var showsApikey = "6f740c06220cb598e70409f4b591536e";
var baseUrl = "https://api.themoviedb.org/3";
var popularUrl =
  baseUrl + "/tv/top_rated?language=en-US&api_key=" + showsApikey;
var baseImageUrl = "https://image.tmdb.org/t/p/original/";
var searchResultsEl = $("#search-results");
var savedList = document.querySelector("#saved-list");
var titles = [];

var searchEL = document.getElementById("title-search");
var btnContainer = document.querySelector(".list-group");
// var savedBtns = btnContainer.getElementsByClassName("a");

var adviceURL = 'https://api.adviceslip.com/advice'
var adviceBtn = document.getElementById('advice-slip');
var adviceContainer = document.getElementById('advice-box')

var sleepInput = document.getElementById("sleep-input");
var otherInput = document.getElementById("other-input");
var otherInputsContainer = document.getElementById("other-inputs-container");
var numbersEnteredText = document.getElementById("numbers-entered");
var POPULAR_SHOW_COUNT = 5;

var totalRunTime = [];

var autocompleteList = document.getElementById("searches");

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
      // howManySeasons(data.results[0].id);
    });
}

function displaySearchResult(results) {
  // if total shows is less that 5, display all else only display the first 5
  var maxNumberOfShows;
  if (results.length >= 5) {
    maxNumberOfShows = 5;
  } else {
    maxNumberOfShows = results.length;
  }

  //fix search result render
  $(searchResultsEl).empty();

  for (var i = 0; i < maxNumberOfShows; i++) {
    var show = results[i];

    // create a card for the tv show
    var cardEl = document.createElement("div");
    $(cardEl).addClass("card movie-card");

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

    // create a div to add all the buttons
    var buttonContainer = document.createElement("div");
    $(buttonContainer).addClass("action-buttons");

    // add a button to go to show details page
    var buttonShowEl = document.createElement("btn"); //<button ></button>
    buttonShowEl.innerText = "Learn more about the show";
    $(buttonShowEl).addClass("btn btn-primary btn-show");
    buttonShowEl.setAttribute("data-tv-id", show.id);

    var buttonCharEl = document.createElement("btn"); //<button ></button>
    buttonCharEl.innerText = "Learn more about the character";
    $(buttonCharEl).addClass("btn btn-primary btn-char");
    buttonCharEl.setAttribute("data-tv-id", show.id);

    var buttonBingeEl = document.createElement("btn"); //<button ></button>
    buttonBingeEl.innerText = "Binge This Show";
    $(buttonBingeEl).addClass("btn btn-primary btn-binge");
    buttonBingeEl.setAttribute("data-tv-id", show.id);

    //add buttons to button container
    buttonContainer.append(buttonShowEl);
    buttonContainer.append(buttonCharEl);
    buttonContainer.append(buttonBingeEl);

    // add elements to card body
    cardBodyEl.append(cardTitleEl);
    cardBodyEl.append(posterEl);
    cardBodyEl.append(buttonContainer);

    // add card body to card and the card to a container in html
    cardEl.append(cardBodyEl);
    searchResultsEl.append(cardEl);
  }
  addClickHandler();
}


function popularShows() {
  fetch(popularUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayPopularShows(data.results);
    });
}

function displayPopularShows(results) {
  console.log(results);

  for (var i = 0; i < POPULAR_SHOW_COUNT; i++) {
    var show = results[i];

    // create a card for the tv show
    var cardEl = document.getElementsByClassName("card")[i];

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

    // create a div to add all the buttons
    var buttonContainer = document.createElement("div");
    $(buttonContainer).addClass("action-buttons");

    // add a button to go to show details page
    var buttonShowEl = document.createElement("btn"); //<button ></button>
    buttonShowEl.innerText = "Learn more about the show";
    $(buttonShowEl).addClass("btn btn-primary btn-show");
    buttonShowEl.setAttribute("data-tv-id", show.id);

    var buttonCharEl = document.createElement("btn"); //<button ></button>
    buttonCharEl.innerText = "Learn more about the character";
    $(buttonCharEl).addClass("btn btn-primary btn-char");
    buttonCharEl.setAttribute("data-tv-id", show.id);

    var buttonBingeEl = document.createElement("btn"); //<button ></button>
    buttonBingeEl.innerText = "Binge This Show";
    buttonBingeEl.setAttribute("data-tv-id", show.id);
    $(buttonBingeEl).addClass("btn btn-primary btn-binge");

    // add elements to card body
    // cardBodyEl.append(cardTitleEl);
    // cardBodyEl.append(posterEl);
    buttonContainer.append(buttonShowEl);
    buttonContainer.append(buttonCharEl);
    buttonContainer.append(buttonBingeEl);
    cardBodyEl.append(buttonContainer);
  }
  // add click handler
  addClickHandler();
}

// adds saved series/show to saved list
function storeSavedTitles() {
  localStorage.setItem("titles", JSON.stringify(titles));
}

// Displays the saved titles in a list onscreen
// function renderTitles() {
//   // savedList.innerHTML = "";

//   // console.log(titles);
//   for (var i = 0; i < titles.length; i++) {
//     var a = document.createElement("a"); //<a></a>
//     a.setAttribute("class", "list-group-item list-group-item-action");
//     // href # is placeholder
//     a.setAttribute("href", "#");

//     // link should display one of the saved titles from the array
//     a.innerText = titles[i];

//     savedList.append(a);
//   }

//   // calling this function to attach listener to all the search text when re-rendered
//   addClickListenerForSearchedText();
// }

// RANDOM ADVICE GENERATOR
// The following two functions call an API to generate a random piece of advice, and then renders that advice on the homepage's footer
function renderAdvice(advice){
  var adviceEl = document.getElementById('adviceEl');

  if(adviceEl != null){
    var adviceText = document.getElementById('adviceEl');

    adviceText.innerText = advice;
    return;
  }else{
    var adviceText = document.createElement('p')
    adviceText.innerText = advice;
    adviceText.setAttribute("id", "adviceEl")

    adviceContainer.appendChild(adviceText)
  };
}

function getAdvice(){

    fetch(adviceURL)
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function(data){
            console.log(data)
            console.log(data.slip.advice)
            renderAdvice(data.slip.advice)
        })
        var advice = data.slip.advice
        console.log(advice)
}

adviceBtn.addEventListener('click', function(){
  getAdvice();
})

// displays the saved list when page initializes
function init() {
  var storedTitles = JSON.parse(localStorage.getItem("titles"));
  console.log(storedTitles);

  if (storedTitles !== null) {
    console.log("titles saved");
    titles = storedTitles;
  }

  // renderTitles();
  popularShows();
  autocomplete();
}

// adds autocomplete feature to search bar
function autocomplete() {
  autocompleteList.innerHTML = "";
  
  for (var i = 0; i < titles.length; i++) {
    var option = document.createElement("option");
    option.innerHTML = titles[i];
    autocompleteList.append(option);
  }
}

searchEL.addEventListener("keypress", function (event) {
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

    // re-render to show newly added text
    // renderTitles();

    // calling function to search for the tv show entered
    searchTvShow(searchText);

    // adds previously searched titles to search bar
    autocomplete();
  }
});

// creating a event handler function which gets called when items are searched for
function addClickHandler() {
  $(".btn-char").on("click", function () {
    console.log("btnclick");
    document.location.href = "./characters.html";
  });

  $(".btn-show").on("click", function (event) {
    console.log("btnclick");
    var tvId = event.target.getAttribute("data-tv-id");
    console.log(tvId);
    localStorage.setItem("showsId", tvId);
    document.location.href = "./details.html";
  });

  $(".btn-binge").on("click", function (event) {
    console.log("btnclick");
    totalRunTime = [];
    var tvId = event.target.getAttribute("data-tv-id");
    console.log(tvId);
    localStorage.setItem("showsId", tvId);
    howManySeasons(tvId);
  });
}

var otherNumbers = [];
// Get the amount of sleep
otherInputsContainer.addEventListener("keypress", function (event) {
  console.log(event);
  if (event.key === "Enter") {
    console.log(sleepInput.value);
    console.log(otherInput.value);

    if (sleepInput.value == "") {
      alert("Please enter a value for sleep!");
      return;
    } else if (otherInput.value == "") {
      alert("Please enter a value for other activities!");
      return;
    } else {

    sleepNumber = Number(sleepInput.value * 420); //value * 7 days * 60 minutes in an hour
    otherNumber = Number(otherInput.value * 420); //value * 7 days * 60 minutes in an hour

    otherNumbers.push(sleepNumber, otherNumber);
    console.log(otherNumbers);

    var totalOther = 0;

    for (var i = 0; i < otherNumbers.length; i++) {
      totalOther += otherNumbers[i];

      console.log(totalOther);
      localStorage.setItem("otherTimes", totalOther);
    }

    numbersEnteredText.textContent = "Your Numbers Have Been Logged!";
    }
  }
});


// see how many seasons a show has
function howManySeasons(tvId) {
  var howManySeasonsUrl =
    baseUrl +
    "/tv/" +
    tvId +
    "?api_key=6f740c06220cb598e70409f4b591536e&language=en-US";

  fetch(howManySeasonsUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.seasons);
      console.log(data.seasons.length);
      howManyEpisodes(data.seasons.length);
    });

  // for each season of the show, find how many episodes there are

  function howManyEpisodes(seasonNumbers) {
    for (var i = 1; i < seasonNumbers + 1; i++) {
      var howManyEpisodesUrl =
        baseUrl +
        "/tv/" +
        tvId +
        "/season/" +
        [i] +
        "?api_key=6f740c06220cb598e70409f4b591536e&language=en-US";

      fetch(howManyEpisodesUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.episodes) {
            runTimes(data.episodes);
          }
          console.log(data.episodes);
        });
    }
  }
}

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

  var sumTwo = sum;
  var otherTime = Number(localStorage.getItem("otherTimes"));
  console.log("other times", otherTime);
  sumTwo += otherTime; //sumTwo = sumTwo + other inputted values

  console.log("sumTwo", sumTwo);
  timeCalculation(sumTwo);
}

function timeCalculation(sum) {
  // how many minutes in a day
  var dayMinutes = 60 * 24;

  // shows us how many days
  var days = Math.floor(sum / dayMinutes);
  console.log(days);

  // shows us how many hours
  var minutesToHours = sum % dayMinutes;
  var hours = Math.floor(minutesToHours / 60);
  console.log(hours);

  //  shows us how many minutes
  var remaindingMinutes = minutesToHours % 60;
  console.log(remaindingMinutes);

  //  allows days, hours, and minutes to display to homepage

  var dhm = [days, hours, remaindingMinutes];
  console.log(dhm);
  displayCalculator(dhm);

  function displayCalculator(times) {
    var daysText = document.getElementById("days-number");
    daysText.textContent = times[0] + " days";
    if (times[0] == 1) {
      daysText.textContent = times[0] + " day";
    }

    var hoursText = document.getElementById("hours-number");
    hoursText.textContent = times[1] + " hours";
    if (times[1] == 1) {
      hoursText.textContent = times[1] + " hour";
    }

    var minutesText = document.getElementById("minutes-number");
    minutesText.textContent = times[2] + " minutes";
    if (times[2] == 1) {
      minutesText.textContent = times[2] + " minute";
    }

    var enjoy = document.getElementById("enjoy");
    enjoy.textContent = "To Watch Your Show - Enjoy!";
  }
}

function addClickListenerForSearchedText() {
  $(".list-group-item-action").on("click", function (event) {
    event.preventDefault();
    var tvShowName = event.target.textContent;
    console.log(tvShowName);
    searchTvShow(tvShowName);
  });
}

addClickListenerForSearchedText();
