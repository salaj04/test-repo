//Function to stop carousel slide change
function stopCarousel() {
  $(".carousel").carousel({ interval: false });
}

//Function to Jump to section- Home/Portfolio/Contact
function jumpSection() {
  $(".page-lnk").click(function() {
    var anchor = $(this).attr("dest");

    $("html, body").animate(
      {
        scrollTop: $("#" + anchor).offset().top
      },
      1000
    );
  });
}

// Function to select tags
function selectTags() {
  //Store selected #hashTags
  var selectedTag = [];

  //Change state and add to selectedTag array
  $("button").on("click", function() {
    if ($(this).attr("data-status") === "inactive") {
      $(this).attr("data-status", "active");
      var tag = $(this).attr("id");
      selectedTag.push(tag);
      console.log("selectedTag", selectedTag);
    } else {
      $(this).attr("data-status", "inactive");
      var tag = $(this).attr("id");
      var index = selectedTag.indexOf(tag);
      selectedTag.splice(index, 1);
      console.log("selectedTag", selectedTag);
    }

    //Convert to string to send as URL query
    var tags = selectedTag.join(",").toString();
    console.log("Tags string", tags);

    //GET request
    $.ajax("/find/" + selectedTag, {
      method: "GET",
      data: tags
    }).then(function(result) {
      console.log("result received", result);
      $("#portfolio-content").empty();
      for(var i=0; i<result.length; i++) {
        buildCarousel();
        stopCarousel();
      }
    });
  });
}

function buildCarousel() {
  //Arrow with Left Slide
  // var iLeft = "<i class='fas fa-chevron-left'></i>";
  var spanLeft = $("<span>").append("iLeft");
  var anchorLeft = $(
    "<a " +
      "class='carousel-control-prev' " +
      "href='#carousel-content' " +
      "role='button' " +
      "data-slide='prev'>"
  ).append(spanLeft);

  //Arrow with Right Slide
  // var iRight = "<i class='fas fa-chevron-right'></i>";
  var spanRight = $("<span>").append("iRight");
  var anchorRight = $(
    "<a " +
      "class='carousel-control-next' " +
      "href='#carousel-content' " +
      "role='button' " +
      "data-slide='next'>"
  ).append(spanRight);

  //Page Three
  var pageThreeImg =
    "<img " +
    "src='./images/eatsht.jpg' " +
    "class='d-block w-100 d-flex align-self-center' " +
    "alt='Project Image'>";
  var pageThree = $(
    "<div " + "class='carousel-item page-three d-flex'>"
  ).append(pageThreeImg);

  //Page Two
  var pageTwoGit = "<a href='#'>" + "#github" + "</a>";
  var pageTwoApp = "<a href='#'>" + "#app" + "</a>";

  var pageTwoTags = $(
    "<div " + "class='d-flex justify-content-center page-two-tags'>"
  ).append(pageTwoGit, pageTwoApp);

  var pageTwoText =
    "<div " +
    "class='d-flex'>" +
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
    "</div>";

  var pageTwoContent = $(
    "<div " +
      "class='d-flex flex-column align-items-center justify-content-around page-two-content'>"
  ).append(pageTwoText, pageTwoTags);

  var pageTwo = $(
    "<div " + "class='carousel-item d-flex flex-column page-two'>"
  ).append("Eat Sh*t", pageTwoContent);

  //Page One
  var pageOneImg =
    "<img " +
    "src='./images/eatsht.jpg' " +
    "class='d-block w-100' " +
    "alt='Eat Sh*t'>";
  var pageOne = $(
    "<div " +
      "class='carousel-item active page-one d-flex flex-column justify-content-between'>"
  ).append(pageOneImg, "Eat Sh*t");

  //Carousel Inner
  var carouselInner = $("<div class='carousel-inner'>").append(
    pageOne,
    pageTwo,
    pageThree
  );

  //Carousel Content
  var carouselContent = $(
    "<div " +
      "id='carousel-content' " +
      "class='carousel slide carousel-fade' " +
      "data-ride='carousel'>"
  ).append(carouselInner, anchorLeft, anchorRight);

  //Attach to id- portfolio-content
  $("#portfolio-content").append(carouselContent);
}

$(document).ready(function() {
  jumpSection();
  selectTags();
});
