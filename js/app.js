/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let board;   
let turn;    
let winner;  
let tie;     

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.getElementById("message"); 
const resetEl = document.getElementById("reset");     

/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    // board = ['', '', '', '', '', '', '', '', '','', '', '', '', '', '', ''];
    turn = "X";                                  
    winner = false;                              
    tie = false;                                 
    render();                      
    // sqrListener()
}

function render() {
    updateBoard();   
    updateMessage(); 
}

function updateBoard() {
    board.forEach((cell, index) => {
        const square = squareEls[index];
        square.textContent = cell; 

        
        if (cell === 'X') {
            square.style.color = 'blue'; 
        } else if (cell === 'O') {
            square.style.color = 'red'; 
        } else {
            square.style.color = 'black'; 
        }
    });
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn!`; 
    } else if (!winner && tie) {
        messageEl.textContent = "It's a tie!"; 
    } else {
        messageEl.textContent = `Congratulations, ${winner} wins!`; 
    }
}

function handleClick(event) {
    const index = event.target.id; 
    if (board[index] !== '' || winner) return;

    board[index] = turn; 
    checkForWinner();    
    checkForTie();       
    turn = turn === 'X' ? 'O' : 'X'; 
    render();           
}
function handleClick(event){
const squareIndex = event.target.id
placePiece(squareIndex)
checkForWinner()
}

function placePiece(index){
board[index] = turn
}
// function checkForWinner(){

// }
// function checkForTie(){
    
// }
function checkForWinner() {
    const winningCombo = winningCombos.find(combo => {
        const [a, b, c] = combo;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });

    if (winningCombo) {
        winner = board[winningCombo[0]]; // Set the winner
    }
}

//<---- tic tac toe 4 nvm the code here just for fun----> 

// function checkForWinner() {
//     const winningCombo = winningCombos.find(combo => {
//         const [a, b, c, d] = combo; // Now checking for four squares
//         return board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d];
//     });

//     if (winningCombo) {
//         winner = board[winningCombo[0]]; // Set the winner
//     }
// }

function checkForTie() {
    tie = board.every(cell => cell); 
}


const winningCombos = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];
// const winningCombos = [
//     // Horizontal
//     [0, 1, 2, 3],
//     [4, 5, 6, 7],
//     [8, 9, 10, 11],
//     [12, 13, 14, 15],
//     // Vertical
//     [0, 4, 8, 12],
//     [1, 5, 9, 13],
//     [2, 6, 10, 14],
//     [3, 7, 11, 15],
//     // Diagonal
//     [0, 5, 10, 15],
//     [3, 6, 9, 12]
// ];

// function sqrListener(){
//     squareEls.forEach(square => {
//         square.addEventListener('click', handleClick);
//     });
// }

resetEl.addEventListener('click', init); 

window.onload = init;