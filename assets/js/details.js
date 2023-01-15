var showsApikey = "6f740c06220cb598e70409f4b591536e";
var baseUrl = "https://api.themoviedb.org/3";

var showsId = localStorage.getItem("showsId");
console.log(showsId);

function getTvShowData() {
  var showDetailUrl =
    baseUrl +
    "/tv/" +
    showsId +
    "?language=en-US&append_to_response=videos&api_key=" +
    showsApikey;

    fetch(showDetailUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
getTvShowData();