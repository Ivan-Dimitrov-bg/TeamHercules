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

drawField(fieldWalls);
var pacMan = new PacMan(200, 100, 'left');
StartChangeDirectionListener(pacMan);

function gameCicle()
{
    pacMan.draw();
    pacMan.move();
    console.log(pacMan.direction);
}

setInterval(function () {gameCicle();}, 100);
