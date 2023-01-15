var showsApikey = "6f740c06220cb598e70409f4b591536e";
var baseUrl = "https://api.themoviedb.org/3";
var baseImageUrl = "https://image.tmdb.org/t/p/original";
var tvShowHeaderEl = document.getElementById("tv-show-header");
var tvShowInfoEl = document.getElementById("tv-show-info");
var tvShowImageEl = document.getElementById("tv-show-image");
var tvShowGenresEl = document.getElementById("tv-show-genres");
var createdBy = document.getElementById("created-by");
var tvDescriptionEl = document.getElementById("tv-description");
var castDetailEl = document.getElementById("cast-credits");
var ratingEl = document.getElementById("rating");

var showsId = localStorage.getItem("showsId");
console.log(showsId);

function renderShowDetails(show) {
  console.log(show);
  // header displaying tv show name
  var detailOfShow = document.createElement("div");
  $(detailOfShow).addClass("display-6");
  detailOfShow.innerText = show.name;
  tvShowHeaderEl.append(detailOfShow);

  // image for the poster
  var showsPosterEl = document.createElement("img"); //<img src="..."></img>
  var posterUrl = baseImageUrl + show.poster_path;
  showsPosterEl.src = posterUrl;
  showsPosterEl.height = 700;
  showsPosterEl.width = 500;
  showsPosterEl.style.objectFit = "cover";
  tvShowImageEl.append(showsPosterEl);

  //Add genres type
  var genreTextEl = document.createElement("h5");
  genreTextEl.innerText = "Genres :";
  tvShowGenresEl.append(genreTextEl);

  for (var i = 0; i < show.genres.length; i++) {
    var genresDetail = document.createElement("div");
    $(genresDetail).addClass("genres");
    var genre = show.genres[i];
    genresDetail.innerText = genre.name;
    tvShowGenresEl.append(genresDetail);
  }

  var createdByEl = document.createElement("h5");
  createdByEl.innerText = "Created By :";
  createdBy.append(createdByEl);

  //Add created_by
  for (var i = 0; i < show.created_by.length; i++) {
    var createdDetail = document.createElement("div");
    $(createdDetail).addClass("created-by");
    var directed = show.created_by[i];
    createdDetail.innerText = directed.name;
    createdBy.append(createdDetail);
  }

  var descEl = document.createElement("h5");
  descEl.innerText = "OverView:";
  tvDescriptionEl.append(descEl);
  // Add description
  var descriptionDetail = document.createElement("div");
  $(descriptionDetail).addClass("description");
  descriptionDetail.innerText = show.overview;
  tvDescriptionEl.append(descriptionDetail);

  var castNameEl = document.createElement("h5");
  castNameEl.innerText = "Cast:";
  document.getElementById("cast-title").append(castNameEl);

  for (var i = 0; i < show.credits.cast.length; i++) {
    var creditDetail = document.createElement("p");
    $(creditDetail).addClass("credit");
    var castEl = show.credits.cast[i];
    creditDetail.innerText = castEl.name;
    document.getElementById("cast-list").append(creditDetail);
  }

  var showRating = document.createElement("h5");
  $(showRating).addClass("rate");
  showRating.innerText = "Rating : " + show.vote_average;
  ratingEl.append(showRating);
}

function getTvShowData() {
  var showDetailUrl =
    baseUrl +
    "/tv/" +
    showsId +
    "?language=en-US&append_to_response=videos,credits&api_key=" +
    showsApikey;

  fetch(showDetailUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderShowDetails(data);
    });
}
getTvShowData();
