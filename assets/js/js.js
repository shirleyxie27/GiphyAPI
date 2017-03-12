$(document).ready(function() {

// Store a list of topics in an array
  var topics = ["Dog", "Cat", "Elephant", "Duck", "Giraffe", "Rabbit", "Lion", "Panda"];
     // var newButtons = [];

  //Add all items in the topics attay to the DOM as a button
  function createButtons(chips) {
    for (var i = 0; i < chips.length; i++) {
    
    // $("#topicsButton").append("<button id =" + topics[i] + ">");
    // $("button#" + topics[i]).text(topics[i]);
   
    var button = $("<button>");
     button.attr("id",chips[i]).text(chips[i]);
      $("#topic-buttons").append(button);
    }  
  };

  createButtons(topics);



  // When user clickes "Add button", create button
  $("#input-button").on("click", function() {
    event.preventDefault();

    var newTopicsArr = [];
  
  // Get the value of user input and store in variable
    var newTopicsVar = $("#user-input").val().trim();

  // Add new topic to te topic array if user input is not empty
    if (newTopicsVar !== ''){
     newTopicsArr.push(newTopicsVar);
    }
          // create buttons of topics array
        // or (var i = 0; i < topics.length; i++) {
        // var button = $("<button>");
        // button.attr("id",topics[i]).text(topics[i]);
        // $("#topicsButton").append(button);
        // } 

  // Reset input text box
    $("#user-input").val('');
    createButtons(newTopicsArr);

  });



// Click button textbox // user-input
  $(document).on("click", "button", function() {
  
  // Empty existing image
    $("#gif-images").empty();   

  // Create variables for image and URL
  // Get 10 images from Giphy
    var image = $(this).attr("id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + image + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){

      for (i = 0; i < response.data.length; i++) {

  // Put Giphy images on DOM
        var movingGif = response.data[i].images.fixed_height.url; 
        var stillGif = response.data[i].images.fixed_height_still.url;
        var rating = response.data[i].rating;
      // console.log(movieGif, stillGif, rating);

  // Create image tag to add image
        var gifImages = $("<img>");
        gifImages.attr("data-state", "still")    
                 .attr("data-animate", movingGif)    
                 .attr("data-still", stillGif)
                 .attr("src", stillGif);
  // Create p tag to add rating
        var showRating = $("<p>");
        showRating.text("Rating: " + rating);

  // Create div tag to show image and rating together
        var newDiv = $("<div>");
        newDiv.append(showRating, gifImages);
        newDiv.addClass("newDiv");
  
  // Append div tag (image and rating inside) to git-images tag to show on DOM 
        $("#gif-images").append(newDiv);
      }

  }); 



// When user clicks gif, make gif or stop
    $(document).on("click", "img", function() {  //click handlers
  
      var state = $(this).attr("data-state");
      var dataStill = $(this).attr("data-still");
      var dataAnimate = $(this).attr("data-animate");
   
   // If data-state === still, scr === data-animate
      if (state == "still") {
        $(this).attr("src", dataAnimate);
        $(this).attr("data-state", "animate");
      }
     
  // else data-state !== still, scr === data-still
      else {
        $(this).attr("src", dataStill);
        $(this).attr("data-state", "still");
      } 

    });
 
  });

});