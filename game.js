// Array for buttons
var animes = ["bleach anime", "one piece anime", "naruto", "fullmetal alchemist"];

// Function that generates the actual buttons on the page
function renderButtons() {
    // Clears out previous buttons
    $("#stock-button").empty();
    // Creates new list of buttons based on array length animes
    for (var i = 0; i < animes.length; i++) {
        // Generates actual button
        var animeBtn = $("<button>");
        // Adds class anime-btn to each button
        animeBtn.addClass("anime-btn");
        // Adds custom data-anime attribute with value equaling animes array location
        animeBtn.attr("data-anime", animes[i]);
        // Adds text to each button basted on animes array location
        animeBtn.html(animes[i]);
        // Places each button in the div with id stock-button
        $("#stock-button").append(animeBtn);
    }
}

// Event that is triggered each time the user clicks on anime-add button
$("#anime-add").on("click", function (event) {
    // Adds variable to content submitted into animeInput form and cleans it up
    var userAnime = $("#animeInput").val().trim();
    // Prevents potential automatic reset
    event.preventDefault()
    // Sets parameter for an emepty string or undefine input
    if (userAnime.length === 0 || userAnime === undefined) {
        // Creates an alert to inform user they made an invalid input
        alert("Please add an anime title");
    }
    // Sets parameter for giphy search
    else {
        // Adds the content submitted by user to the existing array animes
        animes.push(userAnime);
        // Runs the function renderButtons creating a new list of buttons
        renderButtons();
        // Clears out the text that is already in the input field
        $("#animeInput").val("");
    }
});

// Creates a default list of buttons at the start of the webpage
renderButtons();

// A function that is run whenever the user clicks one of the anime buttons
function animeAction() {
    // A variable that is tied to the specific value of each data-anime in the array and used for custom ajax query
    var anime = $(this).attr("data-anime");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=9wExdf4bs15HbYPozMjltdT1vDPcAenC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        // runs the function for each item in the array (in this case it is specified at 10 objects per query)
        for (var i = 0; i < results.length; i++) {
            // Ensures that our 10 queries are not possessing an r rating
            if (results[i].rating !== "r") {
                // Creates a new div 10 times and adds a variable to them
                var animeDiv = $("<div>");
                // Adds a variable to the rating within the object array 
                var rating = results[i].rating;
                // Adds a variable to the title within the object array
                var title = results[i].title;
                // Adds a variable to the slug within the object array
                var slug = results[i].slug;
                // Adds a variable tp the source within the object array
                var source = results[i].source;
                // Creates a p div with the text for rating
                var ratingText = $("<p>").text("Rating: " + rating);
                // Creates a p div with the text for title
                var titleText = $("<p>").text("Title: " + title);
                // Creates a p div with the text for the slug
                var slugText = $("<p>").text("Slug: " + slug)
                // Creates a p div with the text for the source
                var sourceText = $("<p>").text("Source: " + source)
                // Creates an image div
                var animeImage = $("<img>");
                // Adds a variable to the desired location of the still url within the object array
                var stillImage = results[i].images.fixed_height_still.url;
                // Adds a variable to the desired location of the active url within the object array
                var activeImage = results[i].images.fixed_height.url;
                // Applies the src value and the desired location of the url to each img
                animeImage.attr("src", results[i].images.fixed_height_still.url);
                // Applies custom data-still with the value of stillImage url
                animeImage.attr("data-still", stillImage);
                // Applies custom data-animate with the value of the activeImage url
                animeImage.attr("data-animate", activeImage);
                // Applies custom data-state with the value of still as default
                animeImage.attr("data-state", "still");
                // Applies class to each image with value of anime-gif
                animeImage.attr("class", "anime-gif");
                // Adds the titleText to the div on the webpage for each object queried
                animeDiv.append(titleText);
                // Adds the slugText to the div on the webpage for each object queried
                animeDiv.append(slugText);
                // Adds the ratingText to the div on the webpage for each object queried
                animeDiv.append(ratingText);
                // Adds the sourceText to the div on the webpage for each object queried
                animeDiv.append(sourceText);
                // Adds the animeImage to the div on the webpage for each object queried
                animeDiv.append(animeImage);
                // Creates a class for each image with the value gif-text
                animeDiv.attr("class", "gif-text")
                // States the specific location where the new queried content will be placed on the page
                $("#anime-image").prepend(animeDiv);
            }
        }
        // Function that is run whenever the user clicks on an image
        $(".anime-gif").on("click", function () {
            // Adds a variable to the custom attribute data-state
            var gifState = $(this).attr("data-state");
            // If the value of data-state is still
            if (gifState === "still") {
                // Changes the src url of the image to data-animate
                $(this).attr("src", $(this).attr("data-animate"));
                // Changes the value of data-state to animate
                $(this).attr("data-state", "animate");
            }
            // If the value of data-state is animate
            else {
                // Changes the src url of the image to data-still
                $(this).attr("src", $(this).attr("data-still"));
                //Changes the value of data-state to still
                $(this).attr("data-state", "still");
            }
        });
    });
};
// An action that is made for each button that is clicked on the webpage
$(document).on("click", ".anime-btn", animeAction);
