var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	maxX = ctx.canvas.width,
	maxY = ctx.canvas.height;

var fieldWalls = LevelsDesign[0].labyrinth,
	allLetters = initializeFood(1),
	cellHeight = 50,
	wallHeight = 6;

var level = 0,
	score = 0,
	lives = 3,
	newGame = false;
	

var	guardians = creatGuardians(4, maxX, maxY),
	pacManSpeed = 4,
	pacMan = new PacMan(408,128, 'left', pacManSpeed);
	
	StartChangeDirectionListener(pacMan);

var game = new Game();
//game.pause = false;
	
(function initGame() {
	drawField(fieldWalls);
	drawLetters(allLetters, ctx);

	pacMan.draw();

	for (i = 0; i < guardians.length; i++) {
		guardians[i].draw(ctx);
	}

	displayScore();
	displayLives(lives);
	updateHighScores();
}());

//start-pause-unpause on space key down
window.addEventListener('keydown', function (e) {
	if (e.keyCode == 32 && newGame == false) {
		e.preventDefault();
		startGame(game);		
	} else if (e.keyCode == 32 && newGame && game.pause == false) {
		e.preventDefault();
		game.pause = true;
	} else if (e.keyCode == 32 && newGame && game.pause) {
		e.preventDefault();
		game.pause = false;
	}
}, false);
var startBtn = document.getElementById('start-game');
	startBtn.addEventListener('click', function () {
	if (newGame == false) {
		startGame(game);
		}
	});
	
function Game() {

    this.pause = true;
    this.level = 1;
}

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

function StartChangeDirectionListener(objectToControl) {
    document.onkeydown = khandle;
     
    function khandle(key) {
        if (key.keyCode === 37) {
			key.preventDefault();
            objectToControl.wantedDirection= "left";
        }
        if (key.keyCode === 39) {
			key.preventDefault();
            objectToControl.wantedDirection = "right";
        }
        if (key.keyCode === 38) {
			key.preventDefault();
            objectToControl.wantedDirection = "up";
        }
        if (key.keyCode === 40) {
			key.preventDefault();
            objectToControl.wantedDirection = "down";
        }
    }
}

function creatGuardians(guardiansCount, maxX, maxY) {
    guardians = [],

	guardiansPositions = [{row: 0, col: 0},
					{row:7, col: 0},
					{row: 0, col: 18},
					{row: 7, col: 18}	
];

    for (i = 0; i < guardiansPositions.length; i++) {
    	var x = guardiansPositions[i].col*50 + (cellHeight + wallHeight) / 2,
    		y = guardiansPositions[i].row*50 + (cellHeight + wallHeight) / 2,
    		radius = 15,
			guardianSpeed = 3
    		direction = randomDirection();						//TODO - change direction eventually
    				
    	var guardian = new Guardian(x, y, radius, guardianSpeed, 'right', 'black', 'yellowgreen');
    
    	guardians.push(guardian);
    }

    return guardians;
}

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
			guardians[i].detectCollisionWithPacman(pacMan);
        }
        displayScore();
		displayLives(lives);
    }
}
	setInterval(function () {gameCicle();}, 40);

function startGame(game) {								//TODO
	updateHighScores();
	score = 0;
	lives = 3;
	//resetPacMan(pacMan);
	//reset guardians
	newGame = true;
	game.pause = false;	
}

function endGame() {								//TODO
	game.pause = true;
	lives = 0;
	var name = prompt('GAME OVER! \n Your brain expanded with: ' + score + '. Enter your name:') || 'Guest'; //better way?
	sessionStorage.setItem(score, name);										//use localStorage instead of sessionStorage?
    updateHighScores();
	newGame = false;

	document.onkeydown = function(e){ return true; }
}

function loseLife() {
	game.pause = true;
	lives--;
	setTimeout(function () {
		resetPacMan(pacMan);
		game.pause = false;
	}, 2000);
}
function resetPacMan(pacMan) {
	pacMan.positionX = 408;
	pacMan.positionY = 128;
	pacMan.wantedDirection = 'left';
	pacMan.speed = pacManSpeed;
}

function displayLives(lives) {
	for (i = 0; i < lives; i++) {
		x = 440 + i * 30;
		y = 430;
	
	var life = drawLife(ctx, x, y);
	}
}

function drawLife(ctx, x, y) {
	ctx.beginPath();
	ctx.arc(x, y, 10, 30 * Math.PI / 180, 330 * Math.PI / 180);
	ctx.lineTo(x, y);
	ctx.closePath();
	ctx.fillStyle = 'yellow';
	ctx.fill();
}
//score
function displayScore() {
	ctx.font = "20px Calibri";
	ctx.textAlign = 'left';
	ctx.fillStyle = "yellowgreen";
	ctx.fillText("Brain expansion: " + score, 10, 435);
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
