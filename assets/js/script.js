var showsApikey = "6f740c06220cb598e70409f4b591536e";
var baseUrl = "https://api.themoviedb.org/3";
var popularUrl = baseUrl + "/tv/popular?language=en-US&api_key=" + showsApikey;

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
      console.log(data);
    });
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
