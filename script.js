'use strict';
//Generating a randowm number
let random = () => {
    return Math.trunc(Math.random() * 20) + 1;
};

//Possible maximum score a user can achieve
const maxScore = Number(document.querySelector('.score').textContent);

//High score of the user
let highScore = Number(document.querySelector('.highscore').textContent);

const getScore = () => {
    return Number(document.querySelector('.score').textContent);
};

//No of times game played by user before current. (As clicked on Again)
let clickOnAgain = Number(document.querySelector('.show').textContent);

let score = getScore();
let num = random();

// If maximum limits of try are attempted but couldnot guess the number then it will return user that he lost the game.
const isZero = () => {
    displayMessage('You Lost!!');
    document.querySelector('.score').textContent = 0;
    makeDisable(1);
};

const makeDisable = value => {
    document.querySelector('.check').disabled = Boolean(value);
    document.querySelector('.guess').disabled = Boolean(value);
};

const displayMessage = value => {
    document.querySelector('.message').textContent = value;
};

const getHighScore = () => {
    if (highScore < score) {
        highScore = score;
        document.querySelector('.highscore').textContent = score;
    }
};
// This function is called when user clicks on the again buton.
// It again set the content as new for the  user.
const restart = () => {
    document.querySelector('.message').style.color = 'black';
    displayMessage('Start guessing...');
    document.querySelector('.score').textContent = maxScore;
    document.querySelector('.number').textContent = '?';
    makeDisable(0);
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = 'rgb(218, 241, 154)';
    score = getScore();
    num = random();
    clickOnAgain++;
    document.querySelector('.show').textContent = clickOnAgain;
};

function isEmpty(val) {
    return val == '';
}

//Event listener for check button
document.querySelector('.check').addEventListener('click', () => {
    document.querySelector('.message').style.color = 'black';

    //user's Guessed value.

    let guess = document.querySelector('.guess').value;
    if (guess !== '') {
        guess = Number(guess);
    }
    if (score === 1) {
        isZero();
    } else if (typeof guess === typeof highScore) {
        // If correct Guess (Win)
        if (guess === num) {
            displayMessage('Correct Guess');
            document.querySelector('body').style.backgroundColor = '#60b347';
            makeDisable(1);
            document.querySelector('.number').textContent = num;
            // Comparing with previous high score of the user.
            getHighScore();

            //If guessed number is greater than actual number and less than  or equal to 20.
        } else if (guess > num && guess <= 20) {
            displayMessage('Too High!!');
            score--;
            document.querySelector('.score').textContent = score;
            //If guessed number is smaller than actual number and greater than 0.
        } else if (guess < num && guess > 0) {
            displayMessage('Too Low!!');
            score--;
            document.querySelector('.score').textContent = score;
        }
        // If out of range number guessed.
        else {
            displayMessage('Choose from the Range Defined');
            document.querySelector('.message').style.color = 'red';
        }
    } else {
        displayMessage('No number choosen or Invalid Format');
    }
});

// If click on again button
document.querySelector('.again').addEventListener('click', () => {
    restart();
});