var fieldWalls = [
    "-------------------------- ",
    "|   |          |          |",
    "----           --        - ",
    "|              |  |       |",
    "--     --     -----       |",
    "|      |       |          |",
    "---            -- --       ",
    "|      |           |      |",
    "    ----                   ",
    "|      |           |      |",
    "               -----       ",
    "|      |           |      |",
    "-------------------------- "
];

var cellHeight = 30;
var wallHeight = 3;

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
                rect.setAttribute('width', cellHeight);
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
    this.speed = 7;
    this.direction = direction;
    this.pause = false;

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
        pacCicle.setAttribute('r', 10);
        pacCicle.setAttribute('cy', this.positionY);
        pacCicle.setAttribute('cx', this.positionX);

        document.getElementById('game').appendChild(pacCicle);

    };

    this.move = function () {
        if (!this.detectCollisions()) {
            switch (this.direction) {
                case 'up':
                    this.positionY += -this.speed;
                    break;
                case 'down':
                    this.positionY += this.speed;
                    break;
                case 'left':
                    this.positionX += -this.speed;
                    break;
                case 'right':
                    this.positionX += this.speed;
                    break;
            }
        }
    };

    this.detectCollisions = function () {
        return false;
    };
}

function StartChangeDirectionListener(pacMan) {
    document.onkeydown = khandle;
     
    function khandle(key) {
        if (key.keyCode === 37) {
            pacMan.direction = "left";
        }
        if (key.keyCode === 39) {
            pacMan.direction = "right";
            console.log(this.direction);
        }
        if (key.keyCode === 38) {
            pacMan.direction = "up";
        }
        if (key.keyCode === 40) {
            pacMan.direction = "down";
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
drawField(fieldWalls);
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	guardiansCount = 4,
	guardians = [];
//guardians
	for (i = 0; i < guardiansCount; i++) {
		var x = getRandomValue(10, 780),			//TODO
			y = getRandomValue(10, 180 ),           //TODO
			radius = 10,
			direction = randomDirection(),
			fillColor = getRandomColor();
			ctx.lineWidth = 3;
			
			
		var guardian = new Guardian(x, y, radius, 3, direction, fillColor, 'yellow');
		
		guardians.push(guardian);
	}	
var pacMan = new PacMan(200, 100, 'left');
StartChangeDirectionListener(pacMan);

function gameCicle()
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);	//clear
    pacMan.draw();
    pacMan.move();
    console.log(pacMan.direction);
    
    for (i = 0; i < guardians.length; i++) {
		guardians[i].draw(ctx);
		guardians[i].move();
	}
}

setInterval(function () {gameCicle();}, 100);

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
