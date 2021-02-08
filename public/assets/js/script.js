$(function () {
  $(".create-burger").on("submit", function (event) {
    event.preventDefault();

    const newBurger = {
      burger_name: $("#burger-input").val(),
      devoured: 0,
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("Added a new burger!");
      location.reload();
    });
  });

  $(".devour-button").on("click", function (event) {
    event.preventDefault();

    const id = $(this).data("id");

    const newEatenState = {
      devoured: true,
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newEatenState,
    }).then(function () {
      console.log("Changed eaten state to true");
      location.reload();
    });
  });
});
