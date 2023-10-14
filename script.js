const boxes = document.querySelectorAll(".box");
const playerInfo = document.querySelector(".game-info");
const newGameButton = document.querySelector("#btn");

// Important varable initialization
let currentPlayer;
let gameGrid;
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Function that initialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI Update
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    });

    newGameButton.classList.remove("active");
    playerInfo.innerText = `Current Player - ${currentPlayer}`;

}

// Function Call
initGame();

function checkGameover(){
    newGameButton.classList.add("active");
}

// Player Swap
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }

    // Update Ui
    playerInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // Next turn for another player
        swapTurn();
        // Winning or not??
        checkGameover();
    }
}

// Box Click
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newGameButton.addEventListener("click", initGame);
