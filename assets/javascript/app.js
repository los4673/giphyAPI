$(document).ready(function () {
    // //Overall Design:
    // 1. Submit = function(Create Button)
    // 2. createGiphy = function(createGiphy)

    // CreateButton {
    //     1.creates button from stored Array
    //     2.Fills out button with information from text-input. Sets value to be input text
    //     3.Attaches function (displayGiphy)
    //     4.Adds to button Section

    // }

    // displayGiphy {
    //     1. Calls Ajax Api Function using infomration from input FormData.IE Value
    //     2. Stores giphys from api in aray
    //     3. runs through array and adds function(startandstop)
    //     4. Appends to gihpy Section
    // }

    // StartStop {
    //     1. Adds Start function gipphy 
    //     2. adds stop function giphy 
    // }
    //---------------------------------------------------------------------------------------
    var animals = ["cats", "dogs", "penguins"];
    function createButton(array) {
        $("#animalButtons").empty();
        $('#animal-input').val("");

        for (var i = 0; i < animals.length; i++) {
            var button = $("<button/>", {
                text: animals[i],
                value: animals[i],
                click: function () { displayGiphy(this.value); }
            });
            $("#animalButtons").append(button);
        }
    };

    createButton(animals);

    function displayGiphy(val) {
        $("#giphys").empty();

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            val + "&api_key=3WTZvytuKNqAI5nTeOY7N7OLTdG4O1OC&rating=g&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var giphy = $("<img>", {
                        src: results[i].images.fixed_height_still.url,
                        "data-state": "still",
                        "data-still": results[i].images.fixed_height_still.url,
                        "data-animate": results[i].images.fixed_height.url,
                        click: function () {
                            var state = $(this).attr("data-state");

                            if (state === "still") {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            } else {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");
                            }
                        }
                    });
                    //Here was the only part i was not able to figure out
                    //The goal was to add the rating using the code below
                    //I used our previouse assignments to find what i thought
                    //Was the solution. For some reason the rating does not show
                    var rate = results[i].rating;
                    var rating = $("<p>").text("rating is " + rate);
                    giphy.append(rating);
                    $("#giphys").append(giphy);
                }
            })

    };

    $("#submit").on("click", function () {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
        createButton(animals);
    })
});
