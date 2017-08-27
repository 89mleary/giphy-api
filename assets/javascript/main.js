var animals = ["Dog", "Cat", "Bird", "Fish"];

$( document ).ready(function() {  // doc ready start

  function renderButtons() { // renderButtons start

    $("#buttons-area").empty();

    for (var i = 0; i < animals.length; i++) { 
      var newButton = $("<button>" + animals[i] + "</button>");
      newButton.addClass("gifbuttons");
      newButton.attr("data-animal", animals[i]);
      $("#buttons-area").append(newButton);
    };

  }; // renderButtons end

  function searched() {

    var searchTerm = $("#input-box").val();
    animals.push(searchTerm);

  };

  renderButtons();
          
  $(".gifbuttons").on("click", function() {  // button clicked start
    $("#gif-area").empty();
    var animal = $(this).attr("data-animal");
    console.log(animal);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) { // ajax done resopnse start

      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {

        var animalDiv = $("<div>");
        animalDiv.addClass("animalDivs");
        
        var p = $("<p>");
        p.text("Rating: " + results[i].rating.toUpperCase());

        var animalImage = $("<img>");
        animalImage.addClass("gif");
        animalImage.attr("src", results[i].images.fixed_width_still.source);

        animalImage.attr("data-state", "still");

        var animalImageStill = results[i].images.fixed_width_still.source;
        animalImage.attr("data-still", animalImageStill);
        var animalImageAnimated = results[i].images.fixed_width.source;
        animalImage.attr("data-animated", animalImageAnimated);

        $(animalDiv).append(p);
        $(animalDiv).append(animalImage);
        $("#gif-area").append(animalDiv);

      };

    }); // ajax done response end

  }); // button clicked end

  $(document).on("click", ".gif", function() { // gif clicked start

    var state = $(this).attr("data-state");

    if (state === "still") {
      var thisAnimate = $(this).attr("data-still");
      $(this).attr("src", thisAnimate);
      $(this).attr("data-state", "animated");
    };

    if (state === "animated") {
      var thisStill = $(this).attr("data-animated");
      $(this).attr("src", thisStill);
      $(this).attr("data-state", "still");
    };

  }); // gif clicked end

  $("#search-button").on("click", function() {

    searched();
    renderButtons();

  });

}); // end of doc ready

