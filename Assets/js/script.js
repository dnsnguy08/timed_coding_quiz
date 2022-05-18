var buttonContainer = document.querySelector(".buttons");

buttonContainer.addEventListener("click", function(event) {
  var element = event.target;

  // Check if the clicked element was an image
  if (element.querySelector("input")) {
    // Get the current value of the image's data-state attribute
    var state = element.getAttribute("data-state");
    
    if (state === "hidden") {
      element.textContent = 'true';
      element.dataset.state = 'show';

    } else {
      // Change the attributes back to their non-animated values
      element.textContent = '';
      element.dataset.state = "hidden";
    }
  }
});
