var fieldWalls = LevelsDesign[0].labyrinth;
var allLetters = initializeFood(1);


var cellHeight = 50;
var wallHeight = 6;
var level = 0;
var score = 0;
var lives = 3;

function Game() {

    this.pause = true;
    this.level = 1;
}

var game = new Game();
game.pause = false;


//maze
function drawField(fieldWalls) {

    var svgNS = 'http://www.w3.org/2000/svg';

    for (var i = 0; i < fieldWalls.length; i++) {
        var y = cellHeight * (~~(i/2));
        for (var j = 0; j < fieldWalls[i].length; j++) {

            var rect = document.createElementNS(svgNS, 'rect');

            if (fieldWalls[i][j] === "-") {
                rect.setAttribute('x', cellHeight * j);
                rect.setAttribute('y', y);
                rect.setAttribute('width', cellHeight + wallHeight);
                rect.setAttribute('height', wallHeight);
                rect.setAttribute('class', 'wall');
                document.getElementById('game').appendChild(rect);
            }
            else if (fieldWalls[i][j] === "|") {
                rect.setAttribute('x', cellHeight * j);
                rect.setAttribute('y', y);
                rect.setAttribute('width', wallHeight);
                rect.setAttribute('height', cellHeight + wallHeight);
                rect.class = 'wall';
                document.getElementById('game').appendChild(rect);
            }
         }
    }
	var sign = document.createElementNS(svgNS, 'text');
	sign.setAttribute('x', 412);
	sign.setAttribute('y', 190);
	sign.innerHTML = 'JavaScript <tspan x="432" y="230">Museum</tspan>';
	document.getElementById('game').appendChild(sign);
	
	var levelSign = document.createElementNS(svgNS, 'text');
	levelSign.setAttribute('x', 18);
	levelSign.setAttribute('y', 85);
	levelSign.innerHTML = 'level <tspan x="22" y="130">1</tspan>';
	document.getElementById('game').appendChild(levelSign);
}

function detectCollisionsWithWalls(direction, posX, posY) {

		var currRow = ~~(posY / cellHeight);
		var currCol = ~~(posX / cellHeight);

		if (direction === 'left' || direction === 'right') {

		if(posY % cellHeight !== (cellHeight + wallHeight) / 2)
		{
			return true;
		}

		//if move to left and hit wall
		if (direction === 'left')
		{
			if (fieldWalls[currRow * 2 + 1][currCol] === '|' && (posX % cellHeight <= (cellHeight + wallHeight) / 2)) {
				return true;
			}
		}
		//if move to right and hit wall
		else if (direction === 'right') {
			if (fieldWalls[currRow * 2 + 1][currCol + 1] === '|' && (posX % cellHeight >= (cellHeight + wallHeight) / 2)) {
				return true;
			}
		}

		return false;
	}

	if (direction === 'up' || direction === 'down') {

		if(posX % cellHeight !== (cellHeight + wallHeight) / 2)
		{
			return true;
		}

		//if moves up and hit wall
		if (direction === 'up')
		{
			if (fieldWalls[currRow * 2][currCol] === '-' && (posY % cellHeight <= (cellHeight + wallHeight) / 2)) {
				return true;
			}
		}
		//if moves down and hit wall
		else if (direction === 'down') {
			if (fieldWalls[currRow*2+2][currCol] === '-' && (posY % cellHeight >= (cellHeight + wallHeight) / 2)) {
				return true;
			}
		}

		return false;
	}
}

function StartChangeDirectionListener(objectToControl) {
    document.onkeydown = khandle;
     
    function khandle(key) {
        if (key.keyCode === 37) {
            objectToControl.wantedDirection= "left";
        }
        if (key.keyCode === 39) {
            objectToControl.wantedDirection = "right";
        }
        if (key.keyCode === 38) {
            objectToControl.wantedDirection = "up";
        }
        if (key.keyCode === 40) {
            objectToControl.wantedDirection = "down";
        }
    }
}

function creatGuardians(guardiansCount, maxX, maxY) {
    guardians = [],
	guardiansPositions = [{'x': 30, y: 30},						//TODO - fix initial coordinates when the maze is final
					{'x': maxX - 30, y: 30},
					{'x': 30, y: maxY - 70},
					{'x': maxX - 30, y: maxY - 70}	
];

    for (i = 0; i < guardiansCount; i++) {
    	var x = guardiansPositions[i].x,
    		y = guardiansPositions[i].y,
    		radius = 15,
			guardianSpeed = 3
    		direction = randomDirection();						//TODO - change direction eventually
    		//fillColor = getRandomColor();
    				
    	var guardian = new Guardian(x, y, radius, guardianSpeed, direction, 'black', 'yellowgreen');
    
    	guardians.push(guardian);
    }

    return guardians;
}

//draw game objects and animate
drawField(fieldWalls);

var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	maxX = ctx.canvas.width,
	maxY = ctx.canvas.height,
	guardians = creatGuardians(4, maxX, maxY),
	pacManSpeed = 4;

var pacMan = new PacMan(408,128, 'left', pacManSpeed);		//128, 28
StartChangeDirectionListener(pacMan);

function gameCicle()
{
    if (game.pause === false) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);	//clear
        drawLetters(allLetters, ctx);
        ctx.fillText(20, 20, "h");
        pacMan.draw();
        pacMan.move();


        for (i = 0; i < guardians.length; i++) {
            guardians[i].draw(ctx);
            guardians[i].move();
            guardians[i].detectWallCollision(maxX, maxY);
			guardians[i].detectCollisionWithPacman(pacMan);
        }
        displayScore();
    }
}
setInterval(function () {gameCicle();}, 40);

function startGame() {								//TODO
	updateHighScores();
}

function endGame() {								//TODO
	game.pause = true;
	var name = prompt('GAME OVER! \n Your brain expanded with: ' + score + '. Enter your name:') || 'Guest'; //better way?
	sessionStorage.setItem(score, name);										//use localStorage instead of sessionStorage?
    updateHighScores();
}
function loseLife() {								//TODO
	game.pause = true;
	lives--;
	setTimeout(function () {
		resetPacManOnLostLife(pacMan);
		game.pause = false;
	}, 2000);
}
function resetPacManOnLostLife(pacMan) {
	pacMan.positionX = 408;
	pacMan.positionY = 128;
	pacMan.direction = 'left';
}
//score
function displayScore() {
	ctx.font = "20px Calibri";
	ctx.textAlign = 'left';
	ctx.fillStyle = "yellowgreen";
	ctx.fillText("Brain expansion: " + score, 10, 430);
	}
//update high-score board
function updateHighScores () {
	var highScoreBoard = document.getElementById('high-score-board'),
		highScoresCount = 10;
//remove a child node to keep high-score board length lower than highScoresCount
        while (highScoreBoard.firstChild) {
            highScoreBoard.removeChild(highScoreBoard.firstChild);
        }
//sort sessionStorage
		var sortedScores = [];
	
		for (var prop in sessionStorage) {
				if (sessionStorage.hasOwnProperty(prop) && !isNaN(prop)) {
					sortedScores.push(prop);
				}
			}

		sortedScores.sort(function (a, b) {
				return b - a;
			});
//add first highScoresCount number of
        for (i = 0; i < highScoresCount; i++) {
            var highScore = sortedScores[i];
            if (highScore && highScore !== undefined) {
                var scoreListItem = document.createElement('li');
                scoreListItem.innerText = sessionStorage[highScore] + ' : ' + highScore;	//sessionStorage[highScore] = name
                highScoreBoard.appendChild(scoreListItem);
            }
        }
    };
//random functions

function getRandomValue(min, max) {

	return (Math.random() * (max - min) + min) | 0;

}

function getRandomColor() {
		var red = getRandomValue(0, 255);
		var blue = getRandomValue(0, 255);
		var green = getRandomValue(0, 255);

		return "rgb(" + red + "," + green + "," + blue + ")";
}

function randomDirection() {
	var direction,
		randomNumber = Math.random();

	if (randomNumber <= 0.25){

		direction = "left";

	} else if (randomNumber > 0.25 && randomNumber <= 0.5) {

		direction = "right";

	} else if (randomNumber > 0.5 && randomNumber <= 0.75) {

		direction = "up";

	} else {

		direction = "down";

	}

return direction;	

}
//endGame();
//updateHighScores(); on game load
