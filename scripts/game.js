var soundEat = new Audio("./sounds/pacman_coinin.wav"),
    soundDie = new Audio("./sounds/pacman_death.wav"),
    soundIntro = new Audio("./sounds/pacman_song.wav");
soundEat.volume=0.3;

var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	maxX = ctx.canvas.width,
	maxY = ctx.canvas.height;

var level = 0,
	EvilPacmanScore = 0,
	lives = 3,
	newGame = false;

var fieldWalls = LevelsDesign[level].labyrinth,
	allLetters = initializeFood(level),
	cellHeight = 50,
	wallHeight = 6;
	

var	guardians = creatGuardians(LevelsDesign[level].guardiansPositions),
	pacManSpeed = 4,
	pacMan = new PacMan(408,128, 'left', pacManSpeed);
	
	StartChangeDirectionListener(pacMan);

var game = new Game();
	
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

//start page
var tips = document.getElementById('tips'),
	tipsBtn = document.getElementById('tips-btn');
	tipsBtn.addEventListener('click', function () {
		if (tips.classList.contains('hidden')) {
			tips.classList.remove('hidden');
			
			if (newGame) {
				game.pause = true;
			}
		} else {
			tips.classList.add('hidden');			
			
			if (newGame) {
				game.pause = false;
			}
		}
    });
	
var closeTips = document.getElementById('closeTips');
	closeTips.addEventListener('click', function () {
		tips.classList.add('hidden');
		
		if (newGame) {
			game.pause = false;
		}
	});
	
var gameStory = document.getElementById('game-story'),
	storyBtn = document.getElementById('story-btn');
	storyBtn.addEventListener('click', function () {
		if (gameStory.classList.contains('hidden')) {
			gameStory.classList.remove('hidden');
			if (newGame) {
				game.pause = true;
			}
		} else {
			gameStory.classList.add('hidden');
			if (newGame) {
				game.pause = false;
			}
		}
	});

var closeStory = document.getElementById('closeStory');
	closeStory.addEventListener('click', function () {
		gameStory.classList.add('hidden');
		
		if (newGame) {
			game.pause = false;
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

	
function startGame(game) {
    
    soundIntro.play();
    updateHighScores();
    level = 0;
	EvilPacmanScore = 0;
	lives = 3;
	pacMan = null;
    pacMan = new PacMan(408, 128, 'left', pacManSpeed);
    StartChangeDirectionListener(pacMan);
    allLetters = null;
    allLetters = initializeFood(level);
	resetGuardians(guardians,LevelsDesign[level].guardiansPositions);
	newGame = true;
	game.pause = false;	
}

function endGame() {								//TODO
	game.pause = true;
	lives = 0;
	var EvilPacmanName = prompt('GAME OVER! \n Your brain expanded with: ' + EvilPacmanScore + '. Enter your name:') || 'Guest'; //better way?
	localStorage.setItem(EvilPacmanScore, EvilPacmanName);
    updateHighScores();
    newGame = false;

	document.onkeydown = function(e){ return true; }
}

function loseLife() {
	game.pause = true;
	lives--;
	setTimeout(function () {
	    resetPacMan(pacMan);
        resetGuardians(guardians,LevelsDesign[level].guardiansPositions);
		game.pause = false;
	}, 2000);
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
	ctx.fillText("Brain expansion: " + EvilPacmanScore, 10, 435);
	}

//update high-score board
function updateHighScores () {
	var highScoreBoard = document.getElementById('high-score-board'),
		highScoresCount = 10;
        //remove a child node to keep high-score board length lower than highScoresCount
        while (highScoreBoard.firstChild) {
            highScoreBoard.removeChild(highScoreBoard.firstChild);
        }
        //sort localStorage
		var sortedScores = [];
	
		for (var prop in localStorage) {
				if (localStorage.hasOwnProperty(prop) && !isNaN(prop)) {
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
                scoreListItem.innerText = localStorage[highScore] + ' : ' + highScore;	//localStorage[highScore] = name
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
