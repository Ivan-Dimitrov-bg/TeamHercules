var fieldWalls = LevelsDesign[0].labyrinth;
var allLetters = initializeFood(1);
console.log(allLetters);

var cellHeight = 50;
var wallHeight = 6;
var level = 0;
var score = 0;

function Game() {

    this.pause = true;   
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

function resetPacmanSpeed () {
	pacManSpeed = 4;				//TODO - more abstract
}
//guardians
function Guardian(x, y, radius, speed, direction, fillColor, strokeColor) {

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
	this.radius = radius;
	this.fillColor = fillColor;
	this.strokeColor = strokeColor;

	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.quadraticCurveTo(this.x - this.radius * 0.60, this.y + this.radius * 0.670, this.x, this.y);
		ctx.lineTo(this.x + this.radius * 0.60, this.y + this.radius * 0.60);
		ctx.arc(this.x, this.y, this.radius, Math.PI, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = this.fillColor;
		ctx.strokeStyle = this.strokeColor;
		ctx.lineWidth = 6;
		ctx.stroke();
    	ctx.fill();
		//eyes
		ctx.beginPath();
		ctx.arc(this.x + radius/4, this.y - this.radius / 2, this.radius / 5, 0, 2 * Math.PI);
		ctx.arc(this.x - radius/4, this.y - this.radius / 2, this.radius / 5, 0, 2 * Math.PI);
		ctx.fillStyle = 'white';
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.stroke();
    	ctx.fill();
		//pupils
		ctx.beginPath();
		ctx.arc(this.x + radius/4, this.y - this.radius / 2, 1, 0, 2 * Math.PI);
		ctx.arc(this.x - radius/4, this.y - this.radius / 2, 1, 0, 2 * Math.PI);
		ctx.fillStyle = 'black';
		ctx.lineWidth = 1;
    	ctx.fill();
	 };

    this.move = function (direction) {

		switch (this.direction) {
			case 'up':
				this.y += -this.speed;
				break;
			case 'down':
				this.y += this.speed;
				break
			case 'left':
				this.x += -this.speed;
				break;
			case 'right':
				this.x += this.speed;
				break;
		}
    };
	
	this.detectWallCollision = function (maxX, maxY) {		//TODO

        // if (detectCollisionsWithWalls(direction, this.x, this.y)) {
			
			// this.direction = changeGuardianDirection();
		// }
	//outside walls	- remove later
		if (this.x < this.radius) {
			 this.direction = "right";
		 }
		 if (this.x > maxX - this.radius) {
			 this.direction = "left";
		 }
		 if (this.y < this.radius) {
			this.direction = "down";
		 }
		 if (this.y > maxY - this.radius) {
			this.direction = "up";
		 }
	    //adding here Tsonko
		 for (var set = 0; set < fieldWalls.lenght; set++) {
		     if (fieldWalls[set] === "-") {
		         this.direction = "up";
		     }

		     if ((fieldWalls[set] === "|")) {
		         this.direction = "left";
		     }
		     if ((fieldWalls[set] === "|")) {
		         this.direction = "left";
		     }
		 }
	};
}

function changeGuardianDirection() {		//TODO
	return direction = randomDirection();
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
//traps
function setTrap() {
	var trapsAll = [{
		'question': 'What is the type of NaN?',
		'a': 'NaN has a type?!',
		'b': 'number',
		'c': 'undefined',
		'correct': 'b'
	}, {
	    'question': 'How do you create a variable zap that is equal to the string "Whazaaaaap?"?',
	    'a': 'string zap = "Whazaaaaap?";',
	    'b': 'var zap = "Whazaaaaap?"',
	    'c': 'I shout at my screen "Whazaaaaap?"',
		'correct': 'b'
	}, {
		'question': 'How do you create a <div> element using JavaScript?',
		'a': 'document .createElement("div")',
		'b': 'document .getElementByTagName("div")',
		'c': 'I had no idea I could do that.',
		'correct': 'a'
	}, {
		'question': 'Who should have a statue raised in the JavaScript Museum?',
		'a': 'Gosho',
		'b': 'Pesho',
		'c': 'Both',
		'correct': 'c'
	}, {
		'question': 'How do you add a comment in JavaScript?',
		'a': 'I just share my opinion.',
		'b': '<!--This is a comment.-->',
		'c': '//This is a comment.',
		'correct': 'c'
	}
	],
	trapsAllLength = trapsAll.length,
	randomTrapIndex = getRandomValue(0, trapsAllLength - 1),
	playerAnswer = '',
	x = 0,
	y = 0;
//draw
	var stage = new Kinetic.Stage({
        container: 'kinetic',
        width: ctx.canvas.width,
        height: ctx.canvas.height
      });
     
	var layer = new Kinetic.Layer();
	
	function drawTrapBubble() {
		var trapBubble = new Kinetic.Rect({
			x: stage.width() / 2 - (stage.width() * 0.75) / 2,		//center
			y: stage.height() / 2 - (stage.height() * 0.75) / 2,	//center
			width: stage.width() * 0.75,
			height: stage.height() * 0.75,
			fill: 'black',
			stroke: 'purple',
			strokeWidth: 4,
			cornerRadius: 10
		  });	
		layer.add(trapBubble);
		return trapBubble;
	}
	function drawRiddle(trapBubble, layer) {
		var riddle = new Kinetic.Text({
			x: trapBubble.x() + trapBubble.width() / 2,
			y: trapBubble.y(),
			text: 'Uh oh! You fell into a trap!',
			fontSize: 30,
			fontFamily: 'Calibri',
			fill: 'yellow',
			width: trapBubble.width(),
			padding: 20,
			align: 'center'
		});
		riddle.offsetX(riddle.width()/2);		//center
		layer.add(riddle);
		return riddle;
	} 
	function drawTip(trapBubble, layer) {
		var tip = new Kinetic.Text({
			x: trapBubble.x() + trapBubble.width() / 2,
			y: trapBubble.y() + 40,
			text: 'Seems like the JavaScript Guardians won\'t let you steal the museum\'s treasures so easily. Solve the riddle below to become faster for a while. But be careful! If your answer is wrong, you\'ll become slower.',
			fontSize: 15,
			fontFamily: 'Calibri',
			fill: '#888',
			width: trapBubble.width(),
			padding: 20,
			align: 'center'
		});
		tip.offsetX(tip.width()/2);		//center
		layer.add(tip);
		return tip;
	} 
	function drawTrapQuestion(trapBubble, traps, trapIndex, layer) {
		var trapQuestion = new Kinetic.Text({
			x: trapBubble.x() + trapBubble.width() / 2,
			y: trapBubble.y() + 100,
			text: trapsAll[randomTrapIndex]['question'],
			fontSize: 30,
			fontFamily: 'Calibri',
			fill: 'yellowgreen',
			width: trapBubble.width(),
			padding: 20,
			align: 'center'
		});
		trapQuestion.offsetX(trapQuestion.width()/2);		//center
		layer.add(trapQuestion);
		return trapQuestion;
	} 
		
	function drawTrapAnswer (trapBubble, x, letter, traps, trapIndex, layer) {
		var trapAnswer = new Kinetic.Text({
			x: x,
			y: trapBubble.y() + trapBubble.height() - 30 - 50,				//-30 == - fontSize
			text: letter + ') ' + trapsAll[randomTrapIndex][letter],
			fontSize: 22,
			fontFamily: 'Calibri',
			fill: 'yellowgreen',
			id: letter,
			width: trapBubble.width() / 3,
			padding: 2,
			align: 'center'
		});
		trapAnswer.offsetX(trapAnswer.width()/2);			//center	
		
		layer.add(trapAnswer);

		return trapAnswer;
	}	
//draw
	var trapBubble = drawTrapBubble(),
		riddle = drawRiddle(trapBubble, layer),
		tip = drawTip(trapBubble, layer),
		trapQuestion = drawTrapQuestion(trapBubble, trapsAll, randomTrapIndex, layer);

//draw answers
//a
	x = trapBubble.x() + trapBubble.width() / 2 - trapBubble.width() / 3;
	
	var trapAnswerA = drawTrapAnswer(trapBubble, x, 'a', trapsAll, randomTrapIndex, layer);


//b	
	x = trapBubble.x() + trapBubble.width() / 2;
	
	var trapAnswerB	= drawTrapAnswer(trapBubble, x, 'b', trapsAll, randomTrapIndex, layer);

//c
	x = trapBubble.x() + trapBubble.width() / 2 + trapBubble.width() / 3;

	var trapAnswerC	= drawTrapAnswer(trapBubble, x, 'c', trapsAll, randomTrapIndex, layer);

	stage.add(layer);
	
//pick answer
	function onPickTrapAnswerKeydown() {

		window.addEventListener('keydown', function (ev) {
			
			var keyChar = String.fromCharCode(ev.keyCode).toLowerCase();		//gets char on pressed key
			
			if (ev.keyCode === 65) {
				playerAnswer = keyChar;
				checkIfTrueAnswer();
				hideLayer(layer);
			}
			if (ev.keyCode === 66) {
				playerAnswer = keyChar;
				checkIfTrueAnswer();
				hideLayer(layer);
			}
			if (ev.keyCode === 67) {
				playerAnswer = keyChar;
				checkIfTrueAnswer();
				hideLayer(layer);
			}
		});		
	}
	
	function onPickTrapAnswerClick (trapAnswer) {
		trapAnswer.on('click', function() {
			playerAnswer = this.id();
			checkIfTrueAnswer();
			hideLayer(layer);
		});
	}
	onPickTrapAnswerKeydown(layer);
	onPickTrapAnswerClick(trapAnswerA, layer);
	onPickTrapAnswerClick(trapAnswerB, layer);
	onPickTrapAnswerClick(trapAnswerC, layer);

//check if answer is correct or not
	function checkIfTrueAnswer() {		
		if (playerAnswer == trapsAll[randomTrapIndex]['correct']) {
			updateScore();
			//make pacMan faster
			pacManSpeed += 2;						//TODO - more abstract
			//reset speed after 10 seconds
			setTimeout (resetPacmanSpeed, 10000);
			//console.log('true');
		} else {
			//slow pacMan down
			pacManSpeed -=2;
			//reset speed after 10 seconds
			setTimeout (resetPacmanSpeed, 10000);
			//console.log('false');
		}
	}
	function hideLayer(layer) {		
		//layer.hide();
		layer.remove();
	}
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
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);	//clear
    drawLetters(allLetters, ctx);
    ctx.fillText(20, 20, "h");
     pacMan.draw();
     pacMan.move();

    for (i = 0; i < guardians.length; i++) {
		guardians[i].draw(ctx);
		guardians[i].move();
		guardians[i].detectWallCollision(maxX, maxY);
	}
	displayScore();
}

setInterval(function () {gameCicle();}, 40);

function startGame() {								//TODO
	updateHighScores();
}

function endGame() {								//TODO
	var name = prompt('You scored: ' + score + '. Enter your name:') || 'Guest'; //better way?
	sessionStorage.setItem(score, name);										//use localStorage instead of sessionStorage?
    updateHighScores();
}

//score
function updateScore() {
	score += 10;
	//console.log(score);
}
function displayScore() {
	ctx.font = "20px Calibri";
	ctx.textAlign = 'left';
	ctx.fillStyle = "yellowgreen";
	ctx.fillText("Score: " + score, 10, 430);
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
		var sortedScores = [],
			output;
	
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
	var direction;

	if (Math.random() <= 0.25){

		direction = "left";

	} else if (Math.random() > 0.25 && Math.random() <= 0.5) {

		direction = "right";

	} else if (Math.random() > 0.5 && Math.random() <= 0.75) {

		direction = "up";

	} else {

		direction = "down";

	}

return direction;	

}
//added function for popup box /Tsonko
var bubbleBox;
function createTooltipElement() {
    // create balloon element to display info
    bubbleBox = document.createElement("div");
    bubbleBox = document.createElement("input");
    // set style
    bubbleBox.style.visibility = "hidden"; // < make it hidden till mouse over
    bubbleBox.style.position = "fixed";
    bubbleBox.style.width = "150px";
    bubbleBox.style.textAlign = "center";
    //bubbleBox.style.top="1ex";
    //bubbleBox.style.left="1ex";
    bubbleBox.style.borderRadius = "30px";
    bubbleBox.style.backgroundColor = "silver";

    // insert into DOM
    bubbleBox.appendChild(document.createTextNode("empty space"));
    document.body.insertBefore(bubbleBox, document.body.lastChild);
}

function assignHandler() {
    var hoverEle = document.getElementById("popup");//TODO attach here instead of popup 
    //collisionDetected for Packman and Guardian/or trap
    // assign handler
    //hoverEle.addEventListener("click", bubbleActivate , false);
    hoverEle.addEventListener('click', bubbleActivate, false);
    hoverEle.addEventListener("click", bubbleDeactivate, false);
}

function bubbleActivate(evt) {

    // get the position of the hover element
    var boundBox = evt.target.getBoundingClientRect();
    var coordX = boundBox.left;
    var coordY = boundBox.top;

    // adjust bubble position
    bubbleBox.style.left = (coordX + 40).toString() + "px";
    bubbleBox.style.top = (coordY + 40).toString() + "px";

    // add bubble content. Can be any HTML
    bubbleBox.innerHTML = "<span style='font-size:32px;color:red'>" + "Place text content" + "</span>";

    // make bubble VISIBLE
    bubbleBox.style.visibility = "visible";
}

function bubbleDeactivate(evt) {
    if (bubbleActivate == true)//additional check need TODO
        bubbleBox.style.visibility = "hidden";
    else { bubbleDeactivate === false }
}




// ------------------------------
// initialization

// create the element
createTooltipElement();

// assign mouse over event to handler
assignHandler();
//Additional implementation to add close button on popup

//setTrap();
//endGame();
//updateHighScores(); on game load
//Additional implementation to add close button on popup

