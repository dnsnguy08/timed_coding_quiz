//selecting all required elements
const startButton = document.querySelector("#startButton");
const leaderboard = document.querySelector("#highScores");
const questionText = document.querySelector(".question");
const option_list = document.querySelector(".option_list");

leaderboard.addEventListener("click", function(event) {
    var element = event.target;
    console.log(element);
});
// Start the quiz after startButton is clicked
startButton.addEventListener("click", function(event) {
    var element = event.target;
    console.log(element);

    if (document.querySelector(".quizBox")) {
        showQuestions(0);
    }
});

let questionCount = 0;
let questionNum = 1;
let userScore = 0;
const next_btn = document.querySelector(".option");

// if Next Que button clicked
next_btn.onclick = ()=>{
    console.log('weeee');
    if(questionCount < questions.length - 1){ //if question count is less than total question length
        questionCount++; //increment the questionCount value
        questionNum++; //increment the questionNum value
        showQuestions(questionCount); //calling showQuestions function

    }
}

// getting questions and options from arrays ub questions.js
function showQuestions(index){
    const questionText = document.querySelector(".question");
    //creating a new span and div tag for question and option and passing the value using array index
    let questionTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><button>'+ questions[index].options[0] +'</button></div>'
    + '<div class="option"><button>'+ questions[index].options[1] +'</button></div>'
    + '<div class="option"><button>'+ questions[index].options[2] +'</button></div>'
    + '<div class="option"><button>'+ questions[index].options[3] +'</button></div>';
    questionText.innerHTML = questionTag; //adding new span tag inside questionTag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", 'optionSelected(this)');
    }
}


// if user clicked on option
function optionSelected(answer){
    let selectedAnswer = answer.textContent; //getting user selected option
    let correcAnswer = questions[questionCount].answer; //getting correct answer from array
        
    if(selectedAnswer == correcAnswer){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        console.log('correct');
    }else{
        console.log('wrong')
    }
}