var fieldWalls = [
    "---------------------- ",
    "||  |          |      |",
    "-- -           --    - ",
    "|  |           |  |   |",
    "--     --     -----   |",
    "|  |   |       |      |",
    "- -            -- --   ",
    "|      |           |  |",
    "    ----               ",
    "|  | | |           |  |",
    "   -           -----   ",
    "|   |  |           |  |",
    "---------------------- "
];

var cellHeight = 50;
var wallHeight = 6;

function Game() {

    this.pause = true;   
}

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

function PacMan(x,y,direction) {
    this.positionX = x;
    this.positionY = y;
    this.speed = 4;
    this.direction = direction;
    this.wantedDirection = direction;
    this.pause = false;
    this.r = 20;

    this.draw = function () {
        //remove old pac man
        var oldPacMan = document.getElementById('pacMan');
        if (oldPacMan !== null) {
            oldPacMan.remove();
        }

        var svgNS = 'http://www.w3.org/2000/svg';
        var pacCicle = document.createElementNS(svgNS, 'circle');

        //pacCicle.setAttribute('id', 'pacMan');
        pacCicle.setAttribute('id', 'pacMan');
        pacCicle.setAttribute('r', this.r);
        pacCicle.setAttribute('cy', this.positionY);
        pacCicle.setAttribute('cx', this.positionX);

        document.getElementById('game').appendChild(pacCicle);

    };

    this.move = function () {
        for (var i = 0; i < this.speed; i++) {

            //user want to change direction
            if (this.wantedDirection !== this.direction) {
                if(!this.detectCollisions(this.wantedDirection)){
                    this.direction = this.wantedDirection;
                }
            }

            //move if it is possible
            if (!this.detectCollisions(this.direction)) {
                switch (this.direction) {
                    case 'up':
                        this.positionY--;
                        break;
                    case 'down':
                        this.positionY++;
                        break;
                    case 'left':
                        this.positionX--;
                        break;
                    case 'right':
                        this.positionX++;
                        break;
                }
            }
        }
    };

    this.detectCollisions = function (direction) {
        var collisionDetected = false;

        if (detectCollisionsWithWalls(direction, this.positionX, this.positionY)) {
            collisionDetected = true;
        }

        return collisionDetected;

    };

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
    };
}

function StartChangeDirectionListener(pacMan) {
    document.onkeydown = khandle;
     
    function khandle(key) {
        if (key.keyCode === 37) {
            pacMan.wantedDirection= "left";
        }
        if (key.keyCode === 39) {
            pacMan.wantedDirection = "right";
        }
        if (key.keyCode === 38) {
            pacMan.wantedDirection = "up";
        }
        if (key.keyCode === 40) {
            pacMan.wantedDirection = "down";
        }
    }
}

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
		ctx.quadraticCurveTo(this.x - this.radius, this.y + this.radius, this.x, this.y);
		ctx.lineTo(this.x + this.radius, this.y + this.radius);
		ctx.arc(this.x, this.y, this.radius, Math.PI, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = this.fillColor;
		ctx.strokeStyle = this.strokeColor;
		ctx.stroke();
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
    }
}

function creatGuardians(guardiansCount) {
    guardians = [];

    for (i = 0; i < guardiansCount; i++) {
    	var x = getRandomValue(10, 780),			//TODO
    		y = getRandomValue(10, 180 ),           //TODO
    		radius = 7,
    		direction = randomDirection(),
    		fillColor = getRandomColor();
    		ctx.lineWidth = 3;
    				
    	var guardian = new Guardian(x, y, radius, 3, direction, fillColor, 'yellow');
    
    	guardians.push(guardian);
    }

    return guardians;
}

drawField(fieldWalls);

var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
guardians = creatGuardians(4);

var pacMan = new PacMan(128,28, 'left');
StartChangeDirectionListener(pacMan);

function gameCicle()
{
     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);	//clear
     pacMan.draw();
     pacMan.move();

    for (i = 0; i < guardians.length; i++) {
		guardians[i].draw(ctx);
		guardians[i].move();

	}
}

setInterval(function () {gameCicle();}, 40);


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

function randomDirection(direction) {

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