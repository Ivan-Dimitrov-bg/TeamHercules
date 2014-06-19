function PacMan(x, y, direction, speed) {
    this.positionX = x;
    this.positionY = y;
    this.speed = speed;
    this.direction = direction;
    this.wantedDirection = direction;
    this.pause = false;
    this.r = 20;
    this.frame = 0;
    this.imageObj = new Image();
    this.imageObj.src = 'pacman sprite.png';

    this.draw = function () {
        //remove old pac man
        var oldPacMan = document.getElementById('pacMan');
        if (oldPacMan !== null) {
            oldPacMan.remove();
        }

        var svgNS = 'http://www.w3.org/2000/svg';
        var pacCicle = document.createElementNS(svgNS, 'svg');

        //pacCicle.setAttribute('id', 'pacMan');
        pacCicle.setAttribute('id', 'pacMan');
        pacCicle.setAttribute('r', this.r);
        pacCicle.setAttribute('cy', this.positionY);
        pacCicle.setAttribute('cx', this.positionX);
        pacCicle.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "pacman sprite.png");

        //document.getElementById('game').appendChild(pacCicle);

        // draw cropped image
        var spriteX = [0, 40, 80, 118, 80, 40];
        var spriteY= [0, 40, 82, 122, 82, 40];
        if (this.direction == 'right') {
            var sourceX = spriteX[this.frame];
            var sourceY = 2;
        }
        else if (this.direction == 'left') {
            var sourceX = spriteX[this.frame];
            var sourceY = 44;
        }
        else if (this.direction == 'up') {
            var sourceX = 2;
            var sourceY = 86 + spriteY[this.frame];
        }
        else if (this.direction == 'down') {
            var sourceX = 42;
            var sourceY = 86 + spriteY[this.frame];
        }
        var sourceWidth = 38;
        var sourceHeight = 40;
        var destWidth = 38;
        var destHeight = sourceHeight;
        var destX = 100;
        var destY = 100;
        var imageObj = new Image();
        imageObj.src = 'pacman sprite.png';
        ctx.drawImage(this.imageObj, sourceX, sourceY, 39, 43, this.positionX - this.r, this.positionY - this.r, 40, 44);
        this.frame++;
        if (this.frame > 5) {
            this.frame = 0;
        }

    };

    this.move = function () {
        for (var i = 0; i < this.speed; i++) {

            //user want to change direction
            if (this.wantedDirection !== this.direction) {
                if (!this.detectCollisions(this.wantedDirection)) {
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

        //detectCollisionsWithFood
        for (var i = 0; i < allLetters.length; i++) {
            var letter = allLetters[i];
            var dX = this.positionX - letter.x;
            if (dX < 0) {
                dX *= -1;
            }
            var dY = this.positionY - letter.y;
            if (dY < 0) {
                dY *= -1;
            }
            if (dX + dY < this.r * 2 / 3) {
                score += 10;
                if (letter.letter == '{') {
                    setTrap();
                    game.pause = true;
                }

                soundEat.play()
                allLetters.splice(i, 1);
            }
        }

        return collisionDetected;
    };

    function detectCollisionsWithWalls(direction, posX, posY) {

        var currRow = ~~(posY / cellHeight);
        var currCol = ~~(posX / cellHeight);

        if (direction === 'left' || direction === 'right') {

            if (posY % cellHeight !== (cellHeight + wallHeight) / 2) {
                return true;
            }

            //if move to left and hit wall
            if (direction === 'left') {
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

            if (posX % cellHeight !== (cellHeight + wallHeight) / 2) {
                return true;
            }

            //if moves up and hit wall
            if (direction === 'up') {
                if (fieldWalls[currRow * 2][currCol] === '-' && (posY % cellHeight <= (cellHeight + wallHeight) / 2)) {
                    return true;
                }
            }
                //if moves down and hit wall
            else if (direction === 'down') {
                if (fieldWalls[currRow * 2 + 2][currCol] === '-' && (posY % cellHeight >= (cellHeight + wallHeight) / 2)) {
                    return true;
                }
            }

            return false;
        }
    }
}

function resetPacMan(pacMan) {
	pacMan.positionX = 408;
	pacMan.positionY = 128;
	pacMan.wantedDirection = 'left';
	pacMan.speed = pacManSpeed;
}

function StartChangeDirectionListener(objectToControl) {
    document.onkeydown = khandle;
     
    function khandle(key) {
        if (key.keyCode === 37) {
			//key.preventDefault();
            objectToControl.wantedDirection= "left";
        }
        if (key.keyCode === 39) {
			//key.preventDefault();
            objectToControl.wantedDirection = "right";
        }
        if (key.keyCode === 38) {
			//key.preventDefault();
            objectToControl.wantedDirection = "up";
        }
        if (key.keyCode === 40) {
			//key.preventDefault();
            objectToControl.wantedDirection = "down";
        }
    }
}
