'use strict';

// Generate a random secret number when the game start
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
// document.querySelector(".number").textContent = secretNumber;

// TODO: Implementing "check" button
document.querySelector(".check").addEventListener("click", function(){
    const guess = Number(document.querySelector(".guess").value);
    console.log(guess, typeof guess);

    // handle the case when user does not enter any number on the input field
    if(!guess){
        document.querySelector(".message").textContent = "Oppss! No number!"

    // When player wins
    }else if(guess === secretNumber){
        document.querySelector(".message").textContent = "Wow! Correct Number!";
        document.querySelector(".number").textContent = secretNumber;
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";

        if(score > highscore){
            highscore = score;
            document.querySelector(".highscore").textContent = highscore;
        }

    // When guess is too high
    }else if(guess > secretNumber){
        if(score > 1){
            document.querySelector(".message").textContent = "Too high!";
            score--;
            document.querySelector(".score").textContent = score;
        }else{
            document.querySelector(".message").textContent = "You lost the game!";
            document.querySelector(".score").textContent = 0;
        }
    
    // When the guess is too low
    }else if(guess < secretNumber){
        if(score > 1){
            document.querySelector(".message").textContent = "Too low!";
            score--;
            document.querySelector(".score").textContent = score;
        }else{
            document.querySelector(".message").textContent = "You lost the game!";
            document.querySelector(".score").textContent = 0;
        }
    }
});

// TODO: Implementing "Again" button

document.querySelector(".again").addEventListener("click", function(){
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    document.querySelector(".message").textContent = "Start guessing...";
    document.querySelector(".score").textContent = score;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
})