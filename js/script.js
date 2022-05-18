//selecting all required elements
const startButton = document.querySelector("#startButton");
const leaderboard = document.querySelector("#scores");
const questionText = document.querySelector(".question");
const option_list = document.querySelector(".option_list");

leaderboard.addEventListener("click", function(event) {
    var element = event.target;
    console.log(element);
});
// if startQuiz button clicked
startButton.addEventListener("click", function(event) {
    var element = event.target;
    console.log(element);
});
