//selecting all required elements
const startButton = document.querySelector("#startButton");
const leaderboard = document.querySelector("#highScores");
const questionText = document.querySelector(".question");
const optionList = document.querySelector(".optionList");
const timer = document.querySelector("#countdown");
const resultText = document.querySelector(".quizFinish");
const initialsInput = document.querySelector(".saveScore");
const form = document.querySelector('.initials');
const saveButton = document.querySelector('#saveButton');

//Open leaderboard to view high scores
leaderboard.addEventListener("click", function(event) {
    var element = event.target;
    console.log(element);
});

// Start the quiz after startButton is clicked
startButton.addEventListener("click", function(event) {
    var element = event.target;
    var headerText = document.querySelector(".intro h1");
    var infoText = document.querySelector(".intro h3");
    console.log(element);
    headerText.textContent = ''; //remove intro text content once quiz has started
    infoText.textContent = '';  //
    startButton.remove();      //
    if (document.querySelector(".quizBox")) {
        showQuestions(0); //show the first question by adding the content in quizBox
    }
    countdown(); // start timer once start button is clicked
});

let questionCount = 0;
let questionNum = 1;
let userScore = 0;
let timeLeft = 60;

function handleClick() {
    console.log('weeee');
    if(questionCount < questions.length - 1){ //if question count is less than total question length
        questionCount++; //increment the questionCount value
        questionNum++; //increment the questionNum value
        showQuestions(questionCount); //calling showQuestions function
    }
}

// Countdown function
function countdown() {
    var timeInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timer.textContent = " ";
        }
    }, 1000);
}

// getting questions and options from arrays in questions.js
function showQuestions(index){
    //use questions array index to create a new span and div tag for question + options
    let questionTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let optionTag = '<div class="option"><button>'+ questions[index].options[0] +'</button></div>'
    + '<div class="option"><button>'+ questions[index].options[1] +'</button></div>'
    + '<div class="option"><button>'+ questions[index].options[2] +'</button></div>'
    + '<div class="option"><button>'+ questions[index].options[3] +'</button></div>';
    questionText.innerHTML = questionTag; //adding new span tag inside questionTag
    optionList.innerHTML = optionTag; //adding new div tag inside optionTag
    
    const option = optionList.querySelectorAll(".option button");

    // set onclick attribute to all available answer options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", 'optionClicked(this)');
    }
}

// if an answer option is clicked
function optionClicked(answer){
    let selectedAnswer = answer.textContent; //getting user selected option
    let correcAnswer = questions[questionCount].answer; //getting correct answer from array
    let optionResult = document.querySelector('#optionResult');
    let totalText = document.querySelector('#totalScore');
    if(selectedAnswer == correcAnswer){ // if selected option is correct, add to userScore
        userScore += 200;
        console.log('correct');
        totalText.textContent = 'Score: ' + userScore;
        optionResult.textContent = 'Correct!';
        
    }else{
        console.log('wrong');
        totalText.textContent = 'Score: ' + userScore;
        optionResult.textContent = 'Wrong!';
        if (timeLeft >= 10) { // remove 10 seconds from the timer if a wrong answer is selected
            timeLeft -= 10;
        }
    }
    console.log('weeee');
    if(questionCount < questions.length - 1){ //if question count is less than total question length
        questionCount++; //increment the questionCount value
        questionNum++; //increment the questionNum value
        showQuestions(questionCount); //calling showQuestions function

    }else{
        timer.textContent = clearInterval(timer);
        questionText.textContent = 'All Done!';
        optionList.remove();
        showResults();
    }
}

function showResults(){
    // const resultText = document.querySelector(".quizFinish");
    // Add content elements to results page once quiz has finished
    let resultTag = '<span>'+ "Please enter your initials." +'</span>';
    let initialsTag = '<form><input class="initials" type="text" required></input>'
    + '<input onclick="renderScores(this)" id="saveButton" type="submit" value="Save!"></input></form>';
    resultText.innerHTML = resultTag; //adding new span tag inside resultText
    initialsInput.innerHTML = initialsTag; //adding new div tag inside inititalsTag
    
}

// form.addEventListener("submit", function(event){
//     event.preventDefault();
// });

// saveButton.addEventListener('click', function(event) {
//     event.preventDefault();
//     localStorage.setItem('name', saveButton.value);

//     renderScores();
// });

function renderScores() {
    event.preventDefault();
    let tryThis = document.querySelector('.initials');
    localStorage.setItem('name', tryThis.value);
    localStorage.setItem('score', userScore);

    // renderScores();
    if (localStorage.getItem('name')) {
        let name = localStorage.getItem('name');
        let playerScore = `${name} - ${userScore}`;
        questionText.textContent = playerScore;
    }
}
