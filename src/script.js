console.log("jQuery");
var currentSection;
var currentAgent;
var scroller = scrollama();
var bgPositions = [
  [
    [400, 275],
    [700, 300],
    [800, 275],
    [2000, 250],
  ],
  [
    [3000, 275],
    [4000, 500],
    [5000, 400],
    [6000, 200],
  ],
  [
    [7000, 275],
    [9000, 500],
    [11000, 400],
    [13000, 200],
  ],
  [
    [15000, 275],
    [16000, 500],
    [18000, 400],
    [20000, 200],
  ],
  [
    [22000, 275],
    [23000, 500],
    [26000, 400],
    [27000, 200],
  ],
  [
    [28000, 275],
    [29000, 500],
    [30000, 400],
    [32000, 200],
  ],
  [
    [33000, 275],
    [34000, 500],
    [36000, 400],
    [37000, 200],
  ],
];
$(function () {
  scroller = scrollama();
  console.log("loaded");
  $(".prototype-loader .btn").click(function () {
    var loaderEl = $(this).parents(".prototype-loader");
    console.log("p", loaderEl);
    var parentEl = loaderEl.parents(".prototype");
    var containerEl = parentEl.find(".prototype-container");
    var iFrame = parentEl.find("iframe");
    containerEl.show();
    loaderEl.hide();
    console.log(parentEl);
    console.log(iFrame);
    // iFrame.load(function(){
    //   console.log("loaded frame");
    // })
    console.log(iFrame, iFrame.attr("data-src"));
    iFrame.attr("src", iFrame.attr("data-src"));
  });

  $("[data-link]").click(function () {
    console.log($(this).data("link"));
    scrollToSection($("#" + $(this).data("link")));
  });

  $(".nav-open-menu").click(function () {
    console.log(this);
    $(".menu-overlay-container").show();
  });
  $(".menu-overlay-container").click(function () {
    $(".menu-overlay-container").hide();
  });
  $(".section-title").click(function () {
    scrollToSection($(this).parents(".step"));
  });
  $(".nav-prev-section").click(function () {
    scrollToSection($(currentSection).prev(".step"));
    console.log($(currentSection).prev(".step"));
  });
  $(".nav-next-section").click(function () {
    console.log($(currentSection).next(".step"));
    scrollToSection($(currentSection).next(".step"));
  });
  $(".cards-principles .btn-circle").click(function () {
    var width = $($(".cards-principles .col-10")[0]).width();
    width += $($(".cards-principles .col-10")[1]).width();
    $(".cards-principles").animate({ scrollLeft: width }, 500);
  });
  $(".cards-projects .btn-circle").click(function () {
    var width = $($(".cards-projects .col-10")[0]).width();
    width += $($(".cards-projects .col-10")[1]).width();
    $(".cards-projects").animate({ scrollLeft: width }, 500);
  });
  currentAgent = $($(".ai-option.selected .avatar .material-icons")[0]).text();
  console.log(currentAgent);
  $(".ai-option").click(function () {
    $(".ai-option.selected").removeClass("selected");
    $(this).addClass("selected");
    currentAgent = $(this).find(".avatar .material-icons").text();
    window.open("https://me210829.typeform.com/to/cHglkn7x");
  });

  // setup the instance, pass callback functions
  scroller
    .setup({
      step: ".step",
      offset: 1,
      // progress: true,
    })
    .onStepEnter((response) => {
      currentSection = response.element;
      var index = $(response.element).attr("data-stepIndex");
      var frame = $(response.element).attr("data-stepFrame");
      console.log(response, index, frame);
      var el = $(response.element);
      var x, y;

      if (index && frame) {
        var sideMargin = 0;
        x = bgPositions[index][frame][0];
        y = bgPositions[index][frame][1];
        console.log(x, y);
        // if ($(window).width() > 576) sideMargin = 20;
        $("#tapestry img").css(
          "transform",
          "translate(-" + x + "px, -" + y + "px)"
        );
        console.log(bgPositions[index][frame]);
      }

      // $("#tapestry").css("transform", "translate(" + sideMargin + "vw, 0)");

      // if (el.is(".step-holder-left")) {
      //   x = bgPositions[index][frame][0];
      //   y = bgPositions[index][frame][1];
      //   console.log(x, y);
      //   if ($(window).width() > 576) sideMargin = 20;
      //   $("#tapestry img").css(
      //     "transform",
      //     "translate(-" + x + "px, -" + y + "px)"
      //   );
      //   $("#tapestry").css("transform", "translate(" + sideMargin + "vw, 0)");
      //   console.log(bgPositions[index][frame]);
      // } else if (el.is(".step-holder-right")) {
      //   x = bgPositions[index][frame][0];
      //   y = bgPositions[index][frame][1];
      //   if ($(window).width() > 768) sideMargin = -20;

      //   $("#tapestry img").css(
      //     "transform",
      //     "translate(-" + x + "px, -" + y + "px)"
      //   );
      //   $("#tapestry").css("transform", "translate(" + sideMargin + "vw, 0)");
      //   console.log(bgPositions[index][frame]);
      // }
      // console.log($(window).width());
      // if (el.is(".step-holder")) {
      //   $("#tapestry").show();
      // } else {
      //   $("#tapestry").hide();
      // }
      // if (response.direction == "down") {
      //   $(".nav-container").css("top", -48);
      // }
    })
    .onStepExit((response) => {
      console.log(response);
      // if (response.direction == "up") {
      //   $(".nav-container").css("top", 0);
      // }
    })
    .onStepProgress((response) => {
      console.log(response);
    });
  // setup resize event
  window.addEventListener("resize", scroller.resize);
});
function scrollToSection(sectionElement) {
  scroller.disable();
  console.log("scroll is", scroller);
  $("html, body").animate(
    {
      scrollTop: sectionElement.offset().top,
    },
    1000,
    function () {
      scroller.enable();
    }
  );
}
