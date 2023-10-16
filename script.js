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
        // Initialize boxes with older css properties
        box.classList = `box box${index+1}`;

    });

    newGameButton.classList.remove("active");
    playerInfo.innerText = `Current Player - ${currentPlayer}`;

}

// Function Call
initGame();

// Function to check game result
function checkGameover(){
    let answer = "";

    winningPosition.forEach((position) => {
        // Check all 3 boxes should not empty and all the vlues are same
        if( (gameGrid[position[0]] != "" || gameGrid[position[1]] != "" || gameGrid[position[2]] != "" ) 
        && ( gameGrid[position[0]] === gameGrid[position[1]] ) && ( gameGrid[position[1]] === gameGrid[position[2]] ) ){

            // Checl if winner is X
            if( gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "0";

            // Disable pointer eents
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });    

            
            // now if X or 0 is winner then change it to Green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });

    // Now we have a winner
    if( answer != ""){
        playerInfo.innerText = `Winner Player - ${answer}`;
        newGameButton.classList.add("active");
        return;
    }

    // Now if game is tie
    let boxCount = 0;
    gameGrid.forEach((box) => {
        if(box != "")
            boxCount++;
    });

    if(boxCount === 9){
        playerInfo.innerText = `Game Tied !!`;
        newGameButton.classList.add("active");
    }
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
