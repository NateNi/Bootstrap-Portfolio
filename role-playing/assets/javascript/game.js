src="https://code.jquery.com/jquery-3.3.1.js"
integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
crossorigin="anonymous"

let firstCharacter = {
    name: "Jon Snow",
    hp: 100,
    ap: 10,
    cap: 15,
    imgSource: '<img class=character src="assets/images/first-character.jpg" width="200px" height="200px" alt="firstCharacter">'
}

let secondCharacter = {
    name: "Theon Greyjoy",
    hp: 80,
    ap: 8,
    cap: 10,
    imgSource: '<img class=character src="assets/images/second-character.jpg" width="200px" height="200px" alt="secondCharacter">'
}

let thirdCharacter = {
    name: "Arya Stark",
    hp: 150,
    ap: 15,
    cap: 10,
    imgSource: '<img class=character src="assets/images/third-character.jpg" width="200px" height="200px" alt="thirdCharacter">'
}

let fourthCharacter = {
    name: "Daenerys Targaryen",
    hp: 200,
    ap: 5,
    cap: 10,
    imgSource: '<img class=character src="assets/images/fourth-character.jpg" width="200px" height="200px" alt="fourthCharacter">'
}

let selectedCharacterString = "";
let selectedCharacter;
let enemyCharacters = [];
let defender = "";
let attackStrength = 0;
let myHp = 0;
let defenderHp = 0;
let canFight = false;
let canSelectEnemy1 = false;
let canSelectEnemy2 = false;
let canSelectEnemy3 = false;

function playGame() {


$(document).ready(function(){
    $("#startCharacter1Name").text(firstCharacter.name);
    $("#startCharacter1Image").append(firstCharacter.imgSource);
    $("#startCharacter1Hp").text(firstCharacter.hp);
    $("#startCharacter2Name").text(secondCharacter.name);
    $("#startCharacter2Image").append(secondCharacter.imgSource);
    $("#startCharacter2Hp").text(secondCharacter.hp);
    $("#startCharacter3Name").text(thirdCharacter.name);
    $("#startCharacter3Image").append(thirdCharacter.imgSource);
    $("#startCharacter3Hp").text(thirdCharacter.hp);
    $("#startCharacter4Name").text(fourthCharacter.name);
    $("#startCharacter4Image").append(fourthCharacter.imgSource);
    $("#startCharacter4Hp").text(fourthCharacter.hp);

    $(".characters").css({"padding-left": "20px",
    "padding-right": "20px",
    "padding-bottom": "40px",
    "border": "3px solid green",
    "width": "200px"})


    $(".character").click(function() {
        selectedCharacterString = $(this).attr("alt");
        if (selectedCharacterString === "firstCharacter"){
            selectedCharacter = firstCharacter;
            myHp = selectedCharacter.hp;
            enemyCharacters.push(secondCharacter);
            enemyCharacters.push(thirdCharacter);
            enemyCharacters.push(fourthCharacter);
            addSelected(firstCharacter);
            addEnemy1(secondCharacter);
            addEnemy2(thirdCharacter);
            addEnemy3(fourthCharacter);
        }
        if (selectedCharacterString === "secondCharacter"){
            selectedCharacter = secondCharacter;
            myHp = selectedCharacter.hp;
            enemyCharacters.push(firstCharacter);
            enemyCharacters.push(thirdCharacter);
            enemyCharacters.push(fourthCharacter);
            addSelected(secondCharacter);
            addEnemy1(firstCharacter);
            addEnemy2(thirdCharacter);
            addEnemy3(fourthCharacter);
        }
        if (selectedCharacterString === "thirdCharacter"){
            selectedCharacter = thirdCharacter;
            myHp = selectedCharacter.hp;
            enemyCharacters.push(firstCharacter);
            enemyCharacters.push(secondCharacter);
            enemyCharacters.push(fourthCharacter);
            addSelected(thirdCharacter);
            addEnemy1(firstCharacter);
            addEnemy2(secondCharacter);
            addEnemy3(fourthCharacter);
        }
        if (selectedCharacterString === "fourthCharacter"){
            selectedCharacter = fourthCharacter;
            myHp = selectedCharacter.hp;
            enemyCharacters.push(firstCharacter);
            enemyCharacters.push(secondCharacter);
            enemyCharacters.push(thirdCharacter);
            addSelected(fourthCharacter);
            addEnemy1(firstCharacter);
            addEnemy2(secondCharacter);
            addEnemy3(thirdCharacter);
        }
        $("#startCharacter1Name").text("");
        $("#startCharacter1Image").text("");
        $("#startCharacter1Hp").text("");
        $("#startCharacter2Name").text("");
        $("#startCharacter2Image").text("");
        $("#startCharacter2Hp").text("");
        $("#startCharacter3Name").text("");
        $("#startCharacter3Image").text("");
        $("#startCharacter3Hp").text("");
        $("#startCharacter4Name").text("");
        $("#startCharacter4Image").text("");
        $("#startCharacter4Hp").text("");

        $(".characters").css({"padding-left": "0px",
        "padding-right": "0px",
        "border": "0px solid green",
        "background-color": "white",
        "width": "0px"})


        //-----------------------------------------------

        canSelectEnemy1 = true;
        canSelectEnemy2 = true;
        canSelectEnemy3 = true;

    });
    $("#enemy1").click(function() {
        if (canSelectEnemy1) {
            defender = enemyCharacters[0];
            defenderHp = defender.hp;
            addDefender(defender);
            clearEnemy1();
            canFight = true;
            canSelectEnemy1 = false;
        }
        
    });
    $("#enemy2").click(function() {
        if (canSelectEnemy2){
            defender = enemyCharacters[1];
            defenderHp = defender.hp;
            addDefender(defender);
            clearEnemy2();
            canFight = true;
            canSelectEnemy2 = false;
        }
    });
    $("#enemy3").click(function() {
        if (canSelectEnemy3) {
            defender = enemyCharacters[2];
            defenderHp = defender.hp;
            addDefender(defender);
            clearEnemy3();
            canFight = true;
            canSelectEnemy3 = false;
        }
        
    });
});

}
playGame();

function fight() {
    if (canFight){
        attackStrength = attackStrength + selectedCharacter.ap;
        defenderHp = defenderHp - attackStrength;
        myHp = myHp - defender.cap;
        $("#defendHp").text(defenderHp);
        $("#selectedHp").text(myHp);
        if (myHp <= 0){
            $("#result").text("You have been defeated....GAME OVER!");
            $("#restart").append('<input type="button" id="restartButton" onclick="restart()" value="Restart" style="font-size:40px; margin: 30px; padding: 20px; border: 5px solid black;">');
            canFight = false;
        } else if (defenderHp < 0){
            $("#result").text("You have defeated " + defender.name + ", you can choose to fight another enemy.");
            clearDefend();
            canFight = false;
            if (!canSelectEnemy1 && !canSelectEnemy2 && !canSelectEnemy3){
                $("#result").text("You won! Game Over!")
                $("#restart").append('<input type="button" id="restartButton" onclick="restart()" value="Restart" style="font-size:40px; margin: 30px; padding: 20px; border: 5px solid black;">');
            }
        } else {
            $("#result").text("You attacked " + defender.name + " for " + attackStrength + " damage.\n" + defender.name + " attacked you back for " + defender.cap + " damage.")
        }
    }
}

function restart() {
    $("#restart").text("");
    selectedCharacterString = "";
    selectedCharacter;
    enemyCharacters = [];
    attackStrength = 0;
    myHp = 0;
    defender = "";
    defenderHp = 0;
    canFight = false;
    canSelectEnemy1 = false;
    canSelectEnemy2 = false;
    canSelectEnemy3 = false;

    $("#selected").css({"padding-left": "0px",
    "padding-right": "0px",
    "border": "0px solid green",
    "width": "0px"})

    $("#result").text("");

    $("#selectedName").text("");
    $("#selectedImage").text("");
    $("#selectedHp").text("");

    clearEnemy1();
    clearEnemy2();
    clearEnemy3();
    clearDefend();
    playGame();
}

function addSelected(toAdd) {
    $("#selectedName").text(toAdd.name);
    $("#selectedImage").append(toAdd.imgSource);
    $("#selectedHp").text(toAdd.hp);
    $("#selected").css({"padding-left": "20px",
        "padding-right": "20px",
        "padding-bottom": "40px",
        "border": "3px solid green",
        "background-color": "white",
        "width": "200px"})
}

function addDefender(toAdd) {
    $("#defendName").text(toAdd.name);
    $("#defendImage").append(toAdd.imgSource);
    $("#defendHp").text(toAdd.hp);
    $("#defend").css({"padding-left": "20px",
        "padding-right": "20px",
        "border": "3px solid green",
        "background-color": "black",
        "color": "white",
        "width": "200px"})
}

function addEnemy1(toAdd) {
    $("#enemy1Name").text(toAdd.name);
    $("#enemy1Image").append(toAdd.imgSource);
    $("#enemy1Hp").text(toAdd.hp);
    $("#enemy1").css({"padding-left": "20px",
        "padding-right": "20px",
        "padding-bottom": "40px",
        "border": "3px solid black",
        "background-color": "red",
        "width": "200px"})
}

function addEnemy2(toAdd) {
    $("#enemy2Name").text(toAdd.name);
    $("#enemy2Image").append(toAdd.imgSource);
    $("#enemy2Hp").text(toAdd.hp);
    $("#enemy2").css({"padding-left": "20px",
        "padding-right": "20px",
        "padding-bottom": "40px",
        "border": "3px solid black",
        "background-color": "red",
        "width": "200px"})
}

function addEnemy3(toAdd) {
    $("#enemy3Name").text(toAdd.name);
    $("#enemy3Image").append(toAdd.imgSource);
    $("#enemy3Hp").text(toAdd.hp);
    $("#enemy3").css({"padding-left": "20px",
        "padding-right": "20px",
        "padding-bottom": "40px",
        "border": "3px solid black",
        "background-color": "red",
        "width": "200px"})
}

function clearDefend() {
    $("#defendName").text("");
    $("#defendImage").text("");
    $("#defendHp").text("");
    $("#defend").css({"padding-left": "0px",
        "padding-right": "0px",
        "border": "0px solid green",
        "background-color": "none",
        "width": "0px"})
}

function clearEnemy1() {
    $("#enemy1Name").text("");
    $("#enemy1Image").text("");
    $("#enemy1Hp").text("");
    $("#enemy1").css({"padding-left": "0px",
    "padding-right": "0px",
    "border": "0px solid black",
    "background-color": "none",
    "width": "0px"})
}

function clearEnemy2() {
    $("#enemy2Name").text("");
    $("#enemy2Image").text("");
    $("#enemy2Hp").text("");
    $("#enemy2").css({"padding-left": "0px",
    "padding-right": "0px",
    "border": "0px solid black",
    "background-color": "none",
    "width": "0px"})
}

function clearEnemy3() {
    $("#enemy3Name").text("");
    $("#enemy3Image").text("");
    $("#enemy3Hp").text("");
    $("#enemy3").css({"padding-left": "0px",
    "padding-right": "0px",
    "border": "0px solid black",
    "background-color": "none",
    "width": "0px"})
}

