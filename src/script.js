console.log("jQuery");
var currentSection;
var currentAgent;
$(function () {
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
  const scroller = scrollama();
  $(".nav-current-section").click(function () {
    console.log($(currentSection).next(".step"));
    $("html, body").animate(
      { scrollTop: $(currentSection).offset().top },
      1000
    );
  });
  $(".nav-prev-section").click(function () {
    console.log($(currentSection).next(".step"));
    $("html, body").animate(
      { scrollTop: $(currentSection).prev(".step").offset().top },
      1000
    );
  });
  $(".nav-next-section").click(function () {
    console.log($(currentSection).next(".step"));
    $("html, body").animate(
      { scrollTop: $(currentSection).next(".step").offset().top },
      1000
    );
  });
  currentAgent = $($(".ai-option.selected .avatar .material-icons")[0]).text();
  console.log(currentAgent);
  $(".ai-option").click(function () {
    $(".ai-option.selected").removeClass("selected");
    $(this).addClass("selected");
    currentAgent = $(this).find(".avatar .material-icons").text();
  });

  // setup the instance, pass callback functions
  scroller
    .setup({
      step: ".step",
      // progress: true,
    })
    .onStepEnter((response) => {
      currentSection = response.element;
      console.log(response);
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
