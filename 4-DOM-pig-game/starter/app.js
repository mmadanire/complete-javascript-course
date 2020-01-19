/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// declare variables in global scope
let scores, roundScore, activePlayer, gamePlaying;
// helper function Initialize game
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    // Set all initial values to 0 for score and current value
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // remove all active classes
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');  
    document.querySelector('.player-1-panel').classList.remove('active');
    // add active class to start
    document.querySelector('.player-0-panel').classList.add('active');
}

init();

// helper function 'Next player'
function nextPlayer() {
    // next player 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // set the round score back to 0 each round
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // manipulate class and switch the 'active player;
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    // use toggle instead
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //empty dice area when you switch players
    document.querySelector('.dice').style.display = 'none';
}


// set up event handler on button that rolls dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    // ensure that the game is active
    if (gamePlaying) {
            // 1. Create dice that displays Random number from 0-6
        let dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        // Create a variable that sores the dice to re-use later
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round score only IF the rolled number was NOT a 1
        // !== does not do type coersion
        if (dice !== 1) {
            // add score
            roundScore += dice;
            // display the score in the interface
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // next player 
            nextPlayer();
        }
    }
});

// add functionality to the Hold btn
document.querySelector('.btn-hold').addEventListener('click', function() {
    // check if game is active   
    if (gamePlaying) {
        // add the current local score to the global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if the player won the game
        if (scores[activePlayer] >= 15) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('remove');
            gamePlaying = false;
        } else {
            // next player only if the activePlayer did not win
            nextPlayer();
        }
    }
});

// reset game
document.querySelector('.btn-new').removeEventListener('click', init);
