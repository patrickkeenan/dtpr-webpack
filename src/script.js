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
var assistantPositions = [
  // [715, 156, 42, 48],
  // [2341, 228, 42, 48],
  // [2949, 165, 42, 48],
  // [4420, 159, 25, 29],
  // [5449, 215, 41, 47],
  // [6343, 212, 42, 48],
  // [7816, 161, 55, 63],
  // [8732, 226, 52, 59],
  // [9182, 152, 113, 128],
  // [9673, 199, 79, 89],
  // [10950, 223, 93, 105],
  // [12842, 263, 37, 42],
  [13613, 125, 44, 50],
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
  $(".prototype-loader .btn").click(function () {
    var loaderEl = $(this).parents(".prototype-loader");
    var parentEl = loaderEl.parents(".prototype");
    var containerEl = parentEl.find(".prototype-container");
    var iFrame = parentEl.find("iframe");
    containerEl.show();
    loaderEl.hide();
    // iFrame.load(function(){
    //   console.log("loaded frame");
    // })
    iFrame.attr("src", iFrame.attr("data-src"));
  });

  $("[data-link]").click(function () {
    scrollToSection($("#" + $(this).data("link")));
  });

  $(".nav-open-menu").click(function () {
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
  });
  $(".nav-next-section").click(function () {
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
  $(".ai-option").click(function () {
    $(".ai-option.selected").removeClass("selected");
    $(this).addClass("selected");
    currentAgent = $(this).find(".avatar .material-icons").text();
    var agentIcon = $(this).data("icon");
    $(".tapestry-assistant").attr("src", `images/assistant_${agentIcon}.svg`);
    if (agentIcon == "help") {
      window.open("https://me210829.typeform.com/to/cHglkn7x");
    }
  });

  $(".prototype-conversation .prototype-card").click(function () {
    var step = $(this).data("prototype-step");
    console.log(step);
    $(".prototype-modal").scrollTop(0);
    $(".prototype-modal .data-chain").hide();
    $("#datachain-" + step).show();
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
      var el = $(response.element);
      var x, y;

      if (index && frame) {
        var sideMargin = 0;
        x = bgPositions[index][frame][0];
        y = bgPositions[index][frame][1];
        // if ($(window).width() > 576) sideMargin = 20;
        $("#tapestry .banner").css(
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
      }
      // if (index == undefined && showingPhone == true) {
      //   showingPhone = false;
      //   $("#sticky-prototype").hide();
      // }

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
      // if (response.direction == "up") {
      //   $(".nav-container").css("top", 0);
      // }
    })
    .onStepProgress((response) => {});
  // scroller.onStepEnter();
  // setup resize event
  window.addEventListener("resize", scroller.resize);
  // $(window).resize(function () {
  //   console.log($(".prototype-content"), $(window).width());
  // });
});

function scrollToSection(sectionElement) {
  scroller.disable();
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
