$(document).ready(function () {
    // Initial array of political leaders
    var person = ["Donald Trump", "Hillary Clinton", "Mike Pence", "Sarah Palin"];

    // displayPerson function re-renders the HTML to display the appropriate content
    function displayPerson(personClicked) {
        // Creating an AJAX call for the specific political leader button being clicked
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?q=" + person[personClicked] + "&api_key=LZMYmQXvM36hGfOZXSE3FBX2ekarPAl1&limit=10",
            method: "GET",
            // data: {
            //     id: $(this).val()
            // },
        }).then(function (response) {
                console.log(response);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        // Creating a div to hold the gif
                        var gifDiv = $("<div class='gif'>");

                        // Storing the rating data
                        var rating = results[i].rating;
                        // console.log(results.rating);

                        // Creating an element to have the rating displayed
                        var p = $("<p>").text("Rating: " + rating);

                        // Displaying the rating
                        gifDiv.append(p);

                        // Creating an element to hold the image
                        var image = $("<img>");

                        image.attr("src", results[i].images.fixed_height.url);

                        // Appending the image
                        gifDiv.append(p);
                        gifDiv.append(image);

                        // Putting the entire gif above the previous gifs
                        $("#display-gifs").append(gifDiv);
                    }
                }
            });
        }

    // Function for displaying the buttons data
    function renderButtons() {

        // Deleting the gifs prior to adding new gifs
        $("#gif-buttons").empty();

        // Looping through the array of people
        for (var i = 0; i < person.length; i++) {

            // Then dynamicaly generating buttons for each person in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of gif-btn to our button
            a.addClass("gif-btn");
            // adds an Id to your attr
            a.attr('id', i.toString());
            // Adding a data-attribute
            a.attr(person[i]);
            // Providing the initial button text
            a.text(person[i]);
            // Adding the button to the buttons-view div
            $("#gif-buttons").append(a);
        }
    }

    // This function handles events where a movie button is clicked
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var leader = $("#gif-input").val().trim();

        // Adding person from the textbox to our array
        person.push(leader);

        // Calling renderButtons which handles the processing of our person array
        renderButtons();
    });

    // I was unable to get the gif pausing to work. It would go here.
    
    // Adding a click event listener to all elements with a class of "gif-btn"
    $(document).on("click", ".gif-btn", function(){
        var id = $(this).attr('id');
        console.log(id);
        displayPerson(id);

        // I still need to add code to replace one array of gifs with the new array once a new button is clicked. I ran out of time.
        // I also want to add a function that replaces/refreshes new gifs each time you hit each person button.
    });

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

});