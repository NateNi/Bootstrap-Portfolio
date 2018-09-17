var config = {
    apiKey: "AIzaSyAS98nAen0KXtmioh2cPm1z6rT9nX7--LU",
    authDomain: "rock-paper-scissors-60e2b.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-60e2b.firebaseio.com",
    projectId: "rock-paper-scissors-60e2b",
    storageBucket: "rock-paper-scissors-60e2b.appspot.com",
    messagingSenderId: "1018026205386"
};
firebase.initializeApp(config);

var database = firebase.database();
var playersRefOne = firebase.database().ref("players/first/");
var playersRefTwo = firebase.database().ref("players/second/");
let playerName = "";
let playerChoice;
let opponentChoice;
let opponentName = "";
let numLosses = 0;
let numTies = 0;
let numWins = 0;
let uploadingMove = false;
let moveLogged = false;
let playerReady = false;
let opponentLogged = false;
let resultCalculated = false;


console.log("Ready to go");


$(document).ready(function () {
    $("#submit-move").on("click", function (event) {
        if (!playerReady) {
            playerName = $("#player-name").val();
            event.preventDefault();
            playerChoice = parseInt($("input[name=select]").filter(":checked").attr('value'));
            playObject = {
                name: playerName,
                move: playerChoice
            };
            uploadingMove = true;
            if (!moveLogged) {
                playersRefOne.set(playObject);
            }
            else {
                playersRefTwo.set(playObject);
            }
            uploadingMove = false;
            playerReady = true;
            if (moveLogged) {
                calculateResult();
            }
            else {
                $("#status").text("You submitted a move. Waiting on an opponent.");
            }
        }
    });


    playersRefOne.on("child_added", function (data, prevChildKey) {
        if (!uploadingMove) {
            console.log("Player has data");
            if (!moveLogged) {
                opponentChoice = data.val();
                moveLogged = true;
            }
            else {
                opponentName = data.val();
                if (opponentName === "") {
                    opponentName = "Unknown";
                }
                $("#status").text("Opponent Is Ready, You are facing " + opponentName + ".");
            }
        }

    });

    playersRefTwo.on("child_added", function (data, prevChildKey) {
        if (!moveLogged) {
            if (!opponentLogged) {
                opponentChoice = data.val();
                opponentLogged = true;
            }
            else {
                opponentName = data.val();
                if (opponentName === "") {
                    opponentName = "Unknown";
                }
            }
        }
        calculateResult();
    });

});

function calculateResult() {
    if (!resultCalculated) {


        let translate = ["rock", "paper", "scissors"];
        $("#status").text(opponentName + " chose " + translate[opponentChoice] + ".  You chose " + translate[playerChoice] + ".");
        if (playerChoice === 0) {
            if (opponentChoice === 0) {
                numTies++;
                $("#ties").text("Ties: " + numTies);
                $("#result").text("YOU TIED!");
            }
            else if (opponentChoice === 1) {
                numLosses++;
                $("#losses").text("Losses: " + numLosses);
                $("#result").text("YOU LOST!");
            }
            else if (opponentChoice === 2) {
                numWins++;
                $("#wins").text("Wins: " + numWins);
                $("#result").text("YOU WON!");
            }
        }
        else if (playerChoice === 1) {
            if (opponentChoice === 0) {
                numWins++;
                $("#wins").text("Wins: " + numWins);
                $("#result").text("YOU WON!");
            }
            else if (opponentChoice === 1) {
                numTies++;
                $("#ties").text("Ties: " + numTies);
                $("#result").text("YOU TIED!");
            }
            else if (opponentChoice === 2) {
                numLosses++;
                $("#losses").text("Losses: " + numLosses);
                $("#result").text("YOU LOST!");
            }
        }
        else if (playerChoice === 2) {
            if (opponentChoice === 0) {
                numLosses++;
                $("#losses").text("Losses: " + numLosses);
                $("#result").text("YOU LOST!");
            }
            else if (opponentChoice === 1) {
                numWins++;
                $("#wins").text("Wins: " + numWins);
                $("#result").text("YOU WON!");
            }
            else if (opponentChoice === 2) {
                numTies++;
                $("#ties").text("Ties: " + numTies);
                $("#result").text("YOU TIED!");
            }
        }
        console.log("Num Wins " + numWins);
        console.log("Num Losses " + numLosses);
        console.log("Num Ties " + numTies);
        resultCalculated = true;
        playersRefOne.remove();
        playersRefTwo.remove();
        $("#play-again").append('<button id="again" type="button">Play Again</button>');
    }

    $("#again").on("click", function (event) {
        $("#play-again").empty();
        uploadingMove = false;
        moveLogged = false;
        playerReady = false;
        opponentLogged = false;
        resultCalculated = false;
        // playersRefOne.remove();
        // playersRefTwo.remove();
        $("#status").text("");
        $("#result").text("");
    })

}

