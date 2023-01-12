var showsApikey = "6f740c06220cb598e70409f4b591536e";
var baseUrl = "https://api.themoviedb.org/3";
var popularUrl = baseUrl + "/tv/popular?language=en-US&api_key=" + showsApikey;

var charactersButton = document.getElementById("characters-button");
var detailsButton = document.getElementById("details-button");

charactersButton.onclick = function () {
  document.location.href = "./characters.html";
};

detailsButton.onclick = function () {
  document.location.href = "./details.html";
};
