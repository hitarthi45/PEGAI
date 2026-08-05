// snake_game/static/script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');
const gameOverMessage = document.getElementById('gameOverMessage');

const GRID_SIZE = 20; // Number of cells in width/height
const TILE_SIZE = canvas.width / GRID_SIZE; // Size of each cell in pixels
const GAME_SPEED = 150; // Milliseconds per frame

let snake = [];
let food = {};
let direction = 'right';
let score = 0;
let gameInterval;
let gameOver = true;
let changingDirection = false; // To prevent rapid direction changes in one frame

// --- Game Initialization ---
function initGame() {
    snake = [
        { x: 10, y: 10 }, // Head
        { x: 9, y: 10 },
        { x: 8, y: 10 }  // Tail
    ];
    direction = 'right';
    score = 0;
    scoreDisplay.textContent = score;
    gameOver = false;
    changingDirection = false;
    gameOverMessage.classList.add('hidden');
    startButton.textContent = "Restart Game"; // Change button text after first start

    generateFood();
    clearInterval(gameInterval); // Clear any existing interval
    gameInterval = setInterval(gameTick, GAME_SPEED);
    draw(); // Initial draw
}

// --- Game Loop (called every GAME_SPEED ms) ---
function gameTick() {
    if (gameOver) return;

    changingDirection = false; // Reset flag for next input

    const head = { x: snake[0].x, y: snake[0].y };

    // Move head based on direction
    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    // Check for game over conditions
    if (checkCollision(head)) {
        endGame();
        return;
    }

    // Add new head
    snake.unshift(head);

    // Check if food was eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        generateFood(); // Generate new food, snake grows
    } else {
        snake.pop(); // Remove tail if no food eaten (snake moves normally)
    }

    draw(); // Redraw game state
}

// --- Drawing Functions ---
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach(segment => drawSegment(segment, '#4CAF50')); // Green snake

    // Draw food
    drawSegment(food, '#FF5733'); // Red food
}

function drawSegment(segment, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = '#222';
    ctx.fillRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    ctx.strokeRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

// --- Food Logic ---
function generateFood() {
    let newFoodX, newFoodY;
    let collisionWithSnake;

    do {
        newFoodX = Math.floor(Math.random() * GRID_SIZE);
        newFoodY = Math.floor(Math.random() * GRID_SIZE);
        collisionWithSnake = snake.some(segment => segment.x === newFoodX && segment.y === newFoodY);
    } while (collisionWithSnake); // Ensure food doesn't spawn on the snake

    food = { x: newFoodX, y: newFoodY };
}

// --- Collision Detection ---
function checkCollision(head) {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return true;
    }

    // Self collision (check if head collides with any body segment)
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// --- Game End ---
function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    gameOverMessage.classList.remove('hidden');
}

// --- Input Handling ---
function handleKeyPress(event) {
    if (changingDirection) return; // Ignore multiple key presses in one frame
    changingDirection = true;

    const keyPressed = event.key;
    const goingUp = direction === 'up';
    const goingDown = direction === 'down';
    const goingLeft = direction === 'left';
    const goingRight = direction === 'right';

    // Prevent immediate 180-degree turns
    if (keyPressed === 'ArrowUp' && !goingDown) {
        direction = 'up';
    } else if (keyPressed === 'ArrowDown' && !goingUp) {
        direction = 'down';
    } else if (keyPressed === 'ArrowLeft' && !goingRight) {
        direction = 'left';
    } else if (keyPressed === 'ArrowRight' && !goingLeft) {
        direction = 'right';
    }
}

// --- Event Listeners ---
document.addEventListener('keydown', handleKeyPress);
startButton.addEventListener('click', initGame);

// Initial setup (draw a blank canvas and wait for start)
draw(); // Draw the empty grid initially