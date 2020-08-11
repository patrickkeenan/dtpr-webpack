console.log("jQuery");
var currentSection;
var currentAgent;
var showingPhone = false;
var scroller = scrollama();
var bgPositions = [
  [
    [385, 540],
    [1480, 540],
    [2550, 540],
    [3140, 540],
  ],
  [
    [4690, 540],
    [6000, 540],
    [6810, 540],
    [7850, 540],
  ],
  [
    [8760, 540],
    [9620, 540],
    [10820, 540],
    [11830, 540],
  ],
  [
    [12720, 540],
    [13760, 540],
    [14460, 540],
    [15880, 540],
  ],
  [
    [17030, 540],
    [17850, 540],
    [18800, 540],
    [19800, 540],
  ],
  [
    [21240, 540],
    [21940, 540],
    [23300, 540],
    [24460, 540],
  ],
  [
    [25360, 540],
    [26040, 540],
    [26800, 540],
    [27760, 540],
  ],
];
var phonePositions = [
  [[275], [700], [1000], [1300]],
  [[1600], [2000], [2400], [2800]],
  [[3000], [3300], [3600], [3900]],
  [[4200], [4500], [4900], [5200]],
  [[5600], [6000], [6400], [6800]],
  [[7200], [7600], [8000], [9000]],
  [[9400], [9600], [10500], [11555]],
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

  $(".prototype-conversation").click(function () {
    $(".prototype-modal").scrollTop(0);
    $(".prototype-modal").css("transform", "translateX(-375px)");
  });
  $(".prototype-modal").click(function () {
    $(".prototype-modal").css("transform", "translateX(0)");
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
        $(".prototype-conversation").css(
          "transform",
          "translate(0, -" + phonePositions[index][frame] + "px)"
        );
        // if (index != undefined && showingPhone == false) {
        //   showingPhone = true;
        //   $("#sticky-prototype").show();
        // }

        console.log(bgPositions[index][frame], index);
      }
      // if (index == undefined && showingPhone == true) {
      //   showingPhone = false;
      //   $("#sticky-prototype").hide();
      // }
      console.log(showingPhone, index);

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
  scroller.onStepEnter();
  // setup resize event
  window.addEventListener("resize", scroller.resize);
  $(window).resize(function () {
    console.log($(".prototype-content"), $(window).width());
  });
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
