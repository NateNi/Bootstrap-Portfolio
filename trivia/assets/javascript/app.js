let firstQuestion = {
    question: "William Gibson coined which term in his short story Burning Chrome?",
    answer: "Cyberspace", 
    wrong: ["Robot", "Modem", "Hacker"]
}

let secondQuestion = {
    question: "What genre is William Gibson responsible for pioneering?",
    answer: "Cyberpunk",
    wrong: ["Noir", "Steampunk", "Space Western"]
}

let thirdQuestion = {
    question: "What is the name of the protagonist in Neuromancer?",
    answer: "Case",
    wrong: ["Dex", "Simon", "Xander"]
}

let fourthQuestion = {
    question: "What is the name of the trilogy of books composed of Neuromancer, Count Zero, and Mona Lisa Overdrive?",
    answer: "The Sprawl Trilogy",
    wrong: ["The Data War Trilogy", "The Postman Trilogy", "The Horizon Trilogy"]
}

let fifthQuestion = {
    question: "Who is the only character to make an appearance in Neuromancer, Count Zero, and Mona Lisa Overdrive?",
    answer: "The Finn",
    wrong: ["Case", "Molly", "Armitage"]
}

let sixthQuestion = {
    question: "Keanu Reeves starred in this adaptation of a William Gibson short story.",
    answer: "Johnny Mnemonic",
    wrong: ["Before the Net Was Tamed", "The Age of Power", "Crustacean"]
}

let seventhQuestion = {
    question: "Many credit William Gibson with predicting the rise of the internet. What is his version of the internet called in the Sprawl Trilogy?",
    answer: "The Matrix",
    wrong: ["The Web", "The Highway", "The Tubes"]
}

let eighthQuestion = {
    question: "What is the location of Neuromancer's opening scene?",
    answer: "Chiba, Japan",
    wrong: ["Space", "Goodhaven, Virginia", "Mars"]
}

let ninthQuestion = {
    question: "There was a video game adaptation of Neuromancer. It was NOT playable on which system?",
    answer: "Nintendo Entertainment System",
    wrong: ["Commodore 64", "Amiga", "Apple II"]
}

let tenthQuestion = {
    question: "Neuromancer was the first novel to win the Nebula Award, Philip K. Dick Award, and the _____.",
    answer: "Hugo Award",
    wrong: ["Futurist Award", "British Award of Literature", "H.G. Wells Award"]
}

let eleventhQuestion = {
    question: "Characters in Gibson's books often feature artificial enhancements.  Which of the following does NOT describe one of Molly's enhancements?",
    answer: "Wings",
    wrong: ["Retractable Finger Blades", "Mirrored Lenses Covering Her Eyes", "Heightened Metabolism"]
}

let twelfthQuestion = {
    question: "In Neuromancer, what is Wintermute?",
    answer: "An AI",
    wrong: ["A person", "A password", "A secret language"]
}

let thirteenthQuestion = {
    question: "What does the title Count Zero refer to?",
    answer: "A character",
    wrong: ["A secret code", "An event", "An organization"]
}

let questions = [firstQuestion, secondQuestion, thirdQuestion, fourthQuestion, fifthQuestion, sixthQuestion, seventhQuestion, eighthQuestion, ninthQuestion, tenthQuestion, eleventhQuestion, twelfthQuestion, thirteenthQuestion];
let currentQuestion;
let questionNumber = 0;
let questionLimit = 10;
let numberCorrect = 0;
let numberWrong = 0;
let usedQuestions = [];
let correctPosition = 0;
let timeLeft = true;
let time = 0;
let notSubmitted = true;
let now = 0;
let transitioning = false;
let gameOver = false;
let countdown;
let progress = 0;

$(document).ready(function(){

    function selectQuestion(options){
        let isOld = true;
        let selectedOption;
        while (isOld){
            selectedOption = Math.floor(Math.random()*options.length);
            if (!usedQuestions.includes(selectedOption)){
                isOld = false;
            }
        }
        usedQuestions.push(selectedOption);
        return options[selectedOption];
    }

    function displayQuestion(chosenQuestion, questionNum){
        $(".wins").text("Correct: " + numberCorrect);
        $(".losses").text("Incorrect: " + numberWrong);
        $(".question-text").html(chosenQuestion.question);
        let allAnswers = chosenQuestion.wrong.slice(0);
        allAnswers.push(chosenQuestion.answer);
        let scrambled = [];
        let numChoices = allAnswers.length;
        for (let i = 0; i < numChoices; i++){
            let notChosen = true;
            while (notChosen) {
                let rand = Math.floor(Math.random()*numChoices);
                if (!scrambled.includes(rand)){
                    if (rand === numChoices-1){
                        correctPosition = scrambled.length;
                    }
                    scrambled.push(rand);
                    notChosen = false;
                }   
            }
        }

        $('<input type="radio" name="choices" value=0>'+allAnswers[scrambled[0]]+'</input>').appendTo('.first-option');
        $('<input type="radio" name="choices" value=1>'+allAnswers[scrambled[1]]+'</input>').appendTo('.second-option');
        $('<input type="radio" name="choices" value=2>'+allAnswers[scrambled[2]]+'</input>').appendTo('.third-option');
        $('<input type="radio" name="choices" value=3>'+allAnswers[scrambled[3]]+'</input>').appendTo('.fourth-option');
    }


    $(".start").append('<button type=button id="startButton">START</button>');
    document.getElementById("startButton").addEventListener("click", function(){
        $(".button-orientation").append('<button type=button id="submit">Submit Answer</button>');
        $(".start").empty();
        currentQuestion = selectQuestion(questions);
        questionNumber++;
        $(".question-number").text("Question " + questionNumber);
        displayQuestion(currentQuestion, questionNumber);
        countdown = setInterval(function() { makeTimer(); }, 1000);
        document.getElementById("submit").addEventListener("click", function(){
            if (!gameOver){
                if (timeLeft && notSubmitted){
                    transitioning = true;
                    notSubmitted = false;
                    let playerChoice = parseInt($("input[name=choices]").filter(":checked").attr('value'));
                    if (correctPosition === playerChoice){
                        numberCorrect++;
                        $(".result").text("CORRECT!");
                    }
                    else {
                        numberWrong++;
                        $(".result").text("INCORRECT! The correct answer is " + currentQuestion.answer + ".");
                    }
                }                    
            } 
            else if (gameOver) {
                questionNumber = 0;
                numberCorrect = 0;
                numberWrong = 0;
                usedQuestions = [];
                correctPosition = 0;
                progress = 0;
                timeLeft = true;
                notSubmitted = true;
                now = 0;
                gameOver = false;
    
    
                $("#book").remove();
    
    
    
                $("#submit").html("Submit Answer");
                $(".result").text("");
    
                currentQuestion = selectQuestion(questions);
                questionNumber++;
                $(".progress-bar").attr("style", "width: " + progress + "%")
                $(".progress-bar").html(progress + "%")
                $(".question-number").text("Question " + questionNumber);
                displayQuestion(currentQuestion, questionNumber);
    
                countdown = setInterval(function() { makeTimer(); }, 1000);
            }
        });
    })


    function makeTimer() {
        now = now + 1;
        let timeLimit = 15;
        time = timeLimit-now;
        if (time >= 0) {
            $(".timer").text("Time Remaining: " + time);
        }
        if (time === 0 && notSubmitted) {
            $(".result").text("OUT OF TIME! The correct answer is " + currentQuestion.answer + ".");
            transitioning = true;
            numberWrong++;
            timeLeft= false;
        }
        else if (time === 0 && !notSubmitted) {
            transitioning = true;
            timeLeft= false;
        }
        else if (transitioning){
            transitioning = false;
            now = timeLimit;
        } 
        else if (time <= -6) {
            clearInterval(countdown);
            questionNumber++;
            progress = progress + (100/questionLimit);
            $(".progress-bar").attr("style", "width: " + progress + "%")
            $(".progress-bar").html(progress + "%")
            $(".question-number").text("Question " + questionNumber);
            $(".first-option").empty();
            $(".second-option").empty();
            $(".third-option").empty();
            $(".fourth-option").empty();
            if (questionNumber > questionLimit){
                gameOver = true;
                $(".result").text("GAME OVER!");
                $(".wins").text("Correct: " + numberCorrect);
                $(".losses").text("Incorrect: " + numberWrong);
                $(".question-text").empty();
                $(".question-number").text("Your score is " + numberCorrect/questionLimit*100 + "%.");
                $("#submit").html("Restart")

                $(".answers").prepend('<img id="book" src="assets/images/book.jpg">')

            }
            else {
                correctPosition = 0;
                timeLeft = true;
                notSubmitted = true;
                now = 0;
                $(".result").text("");
                currentQuestion = selectQuestion(questions);
                displayQuestion(currentQuestion, questionNumber);
                countdown = setInterval(function() { makeTimer(); }, 1000);
            }
        }
    }
    
})