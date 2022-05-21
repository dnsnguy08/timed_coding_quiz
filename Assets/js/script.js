//selecting all required elements
const startButton = document.querySelector("#startButton");
const leaderboard = document.querySelector("#highScores");
const questionText = document.querySelector(".question");
const optionList = document.querySelector(".optionList");
const timer = document.querySelector("#countdown");
const optionResult = document.querySelector('#optionResult');
const totalText = document.querySelector('#totalScore');
const resultText = document.querySelector(".quizFinish");
const initialsInput = document.querySelector(".saveScore");
const saveButton = document.querySelector('#saveButton');
const showHighScores = document.querySelector('.leaderboard ul');

//Open leaderboard to view high scores
leaderboard.addEventListener("click", function(event) {
    var element = event.target;
    console.log(element);
    showLeaderboard();
});

// Start the quiz after startButton is clicked
startButton.addEventListener("click", function(event) {
    var element = event.target;
    var headerText = document.querySelector(".intro h1");
    var infoText = document.querySelector(".intro h3");

    headerText.textContent = ''; //remove intro text content once quiz has started
    infoText.textContent = '';  //
    startButton.remove();      //
    // showHighScores.style.display = 'none';
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
    let optionTag = '<div><button class="option">'+ questions[index].options[0] +'</button></div>'
    + '<div><button class="option">'+ questions[index].options[1] +'</button></div>'
    + '<div><button class="option">'+ questions[index].options[2] +'</button></div>'
    + '<div><button class="option">'+ questions[index].options[3] +'</button></div>';
    questionText.innerHTML = questionTag; //adding new span tag inside questionText
    optionList.innerHTML = optionTag; // adding new div tag with answer options inside optionList
    
    const option = optionList.querySelectorAll(".option");

    // set onclick attribute to all available answer options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", 'optionClicked(this)');
    }
}

// if an answer option is clicked
function optionClicked(answer){
    let selectedAnswer = answer.textContent; //getting user selected option
    let correcAnswer = questions[questionCount].answer; //getting correct answer from array

    if(selectedAnswer == correcAnswer){ // if selected option is correct, add to userScore
        userScore += 200;
        totalText.textContent = 'Score: ' + userScore;
        optionResult.textContent = 'Correct!';
        
    }else{
        totalText.textContent = 'Score: ' + userScore;
        optionResult.textContent = 'Wrong!';
        if (timeLeft >= 10) { // remove 10 seconds from the timer if a wrong answer is selected
            timeLeft -= 10;
        }
    }
    if(questionCount < questions.length - 1){ //if question count is less than total question length
        questionCount++; //increment the questionCount value
        questionNum++; //increment the questionNum value
        showQuestions(questionCount); //calling showQuestions function

    }else{
        questionText.textContent = 'All Done!'; // if no more questions, show results
        optionList.remove();
        showHighScores.style.display = 'block';
        showResults();
    }
}

function showResults(){
    // Add content elements to results page once quiz has finished
    let resultTag = '<span>'+ "Please enter your initials." +'</span>';
    let initialsTag = '<form><input class="initials" type="text" required></input>'
    + '<input onclick="renderScores(this)" id="saveButton" type="submit" value="Save!"></input></form>'; // add onclick function when submitting form
    resultText.innerHTML = resultTag; //adding new span tag inside resultText
    initialsInput.innerHTML = initialsTag; //adding new div tag inside inititalsInput
    
}

function showLeaderboard() { // show scores that are stored within localeStorage
    let parseStorage = JSON.parse(localStorage.getItem('dataObject'));
    for (let i = 0; i < parseStorage.length; i++) {
        let theScores = JSON.stringify(parseStorage[i]); // iterate through each stored player score
        let playerTag = '<li>'+ `${theScores}` +'</li>';
        showHighScores.innerHTML += playerTag;  
    }
}

function renderScores() { // store and render the player score on the final page
    event.preventDefault();
    let dataObject = [];
    let form = document.querySelector('.initials');

    if(typeof(Storage) !== "undefined") {
        if (localStorage.getItem('dataObject') && localStorage.getItem('dataObject').length > 0)
            dataObject = JSON.parse(localStorage.getItem('dataObject'));
        const player = {
            name: form.value,
            score: userScore
        };
        dataObject.push(player);
        localStorage.setItem('dataObject', JSON.stringify(dataObject));
    }

    totalText.remove(); // remove question contents when quiz has finished
    optionResult.remove();
    showLeaderboard(); //calling showLeaderboard function

    let playerScore = `Hey '${form.value}' got a score of ${userScore}!`; // Display player score after form submission
    questionText.textContent = playerScore;
    form.value = ''; // remove input text
}
