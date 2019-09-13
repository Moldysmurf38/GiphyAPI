// Array for buttons
var animes = ["bleach anime", "one piece anime", "naruto", "fullmetal alchemist"];

// Function that generates the actual buttons on the page
function renderButtons() {
    $("#stock-button").empty();
    for (var i = 0; i < animes.length; i++) {
        var animeBtn = $("<button>");
        animeBtn.addClass("anime-btn");
        animeBtn.attr("data-anime", animes[i]);
        animeBtn.html(animes[i]);
        $("#stock-button").append(animeBtn);
    }
}

// Event that is triggered each time the user clicks on anime-add button
$("#anime-add").on("click", function (event) {
    var userAnime = $("#animeInput").val().trim();
    event.preventDefault()
    if (userAnime.length === 0 || userAnime === undefined) {
        alert("Please add an anime title");
    }
    // Sets parameter for giphy search
    else {
        animes.push(userAnime);
        renderButtons();
        $("#animeInput").val("");
    }
});

// Creates a default list of buttons at the start of the webpage
renderButtons();

// A function that is run whenever the user clicks one of the anime buttons
function animeAction() {
    $("#anime-display-block").empty()
    var anime = $(this).attr("data-anime");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=9wExdf4bs15HbYPozMjltdT1vDPcAenC&limit=15";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
                var animeDiv = $("<div>");

                var rating = results[i].rating;
                var title = results[i].title;
                var ratingText = $("<p>").text("Rating: " + rating);
                var titleText = $("<p>").text("Title: " + title);
                var slugText = $("<p>").text("Slug: " + slug)


                var sourceText = $("<a>").text("Image Source");
                sourceText.attr("class", i + "-source-link");
                $("." + i + "-source-link").attr("href", results[i].source);

                var animeImage = $("<img>");
                var stillImage = results[i].images.fixed_height_still.url;
                var activeImage = results[i].images.fixed_height.url;
                animeImage.attr("src", results[i].images.fixed_height_still.url);
                animeImage.attr("data-still", stillImage);
                animeImage.attr("data-animate", activeImage);
                animeImage.attr("data-state", "still");
                animeImage.attr("class", "anime-gif");
                animeDiv.append(titleText);
                animeDiv.append(ratingText);
                animeDiv.append(sourceText);
                animeDiv.append(animeImage);
                animeDiv.attr("class", "gif-text")
                $("#anime-display-block").prepend(animeDiv);
        }
        // Function that is run whenever the user clicks on an image
        $(".anime-gif").on("click", function () {
            var gifState = $(this).attr("data-state");
            if (gifState === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            // If the value of data-state is animate
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
};
// An action that is made for each button that is clicked on the webpage
$(document).on("click", ".anime-btn", animeAction);
