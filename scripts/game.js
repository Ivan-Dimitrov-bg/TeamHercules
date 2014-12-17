(function () {
    'use strict';
    require(['pacman', 'guardians'], function (Pacman, Guardian) {
        var soundIntro = new Audio("./sounds/pacman_song.wav"),
            soundDie = new Audio("./sounds/pacman_death.wav");
            soundIntro.volume = 0.2;

        var canvas = document.getElementById("canvas"),
            ctx = canvas.getContext("2d"),
            maxX = ctx.canvas.width,
            maxY = ctx.canvas.height;

        var level = 0,
            EvilPacmanScore = 0,
            lives = 3,
            newGame = false;
        //this.EvilPacmanScore = 0;

        var fieldWalls = LevelsDesign[level].labyrinth,
            allLetters = initializeFood(level),
            cellHeight = 50,
            wallHeight = 6;

        var guardians = Guardian.creatGuardians(LevelsDesign[level].guardiansPositions, cellHeight, wallHeight);
        var pacManSpeed = 4;
        var pacMan = new Pacman(408, 128, 'left', pacManSpeed, fieldWalls, allLetters);

        var game = new Game();

        var startBtn = document.getElementById('start-game');
        startBtn.addEventListener('click', function () {
            if (newGame == false) {
                game.startGame();
            }
        });

        function Game() {

            this.pause = true;
            this.level = 1;
            

            this.startGame = function startGame() {

                soundIntro.play();
                updateHighScores();
                level = 0;
                EvilPacmanScore = 0;
                this.lives = 3;
                allLetters = null;
                allLetters = initializeFood(level);
                pacMan = null;
                pacMan = new Pacman(408, 128, 'left', pacManSpeed, fieldWalls, allLetters);
                Guardian.resetGuardians(guardians, LevelsDesign[level].guardiansPositions);
                newGame = true;
                this.pause = false;
            };

            this.nextGameFrame = function nextGameFrame() {
                if (this.pause === false) {
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);//clear
                    drawLetters(allLetters, ctx);
                    pacMan.draw();
                    pacMan.move(allLetters);

                    for (var i = 0; i < guardians.length; i++) {
                        guardians[i].draw();
                        guardians[i].move();
                        if (guardians[i].detectCollisionWithPacman(pacMan)) {
                            soundDie.play();
                            if (lives > 1) {
                                loseLife();
                            } else {
                                endGame();
                            }
                        }
                    }

                    displayScore();
                    displayLives(lives);
                }
            };

            (function initGame() {
                drawField(fieldWalls, cellHeight, wallHeight);
                drawLetters(allLetters, ctx);

                pacMan.draw(ctx);

                for (var i = 0; i < guardians.length; i++) {
                    guardians[i].draw();
                }

                displayScore();
                displayLives(lives);
                updateHighScores();
            }());

            //start-pause-unpause on space key down
            (function AddPauseListener() {
                window.addEventListener('keydown', function (e) {
                    if (e.keyCode == 32 && newGame == false) {
                        e.preventDefault();
                        game.startGame();;
                    } else if (e.keyCode == 32 && newGame && game.pause == false) {
                        e.preventDefault();
                        game.pause = true;
                    } else if (e.keyCode == 32 && newGame && game.pause) {
                        e.preventDefault();
                        game.pause = false;
                    }
                }, false);
            })();
        }

        setInterval(function () {
            game.nextGameFrame();
        }, 40);

        function endGame() {								//TODO
            game.pause = true;
            lives = 0;
            var EvilPacmanName = prompt('GAME OVER! \n Your brain expanded with: ' + EvilPacmanScore + '. Enter your name:') || 'Guest'; //better way?
            localStorage.setItem(EvilPacmanScore, EvilPacmanName);
            updateHighScores();
            newGame = false;

            document.onkeydown = function (e) { return true; }
        }

        function loseLife() {
            game.pause = true;
            lives--;
            setTimeout(function () {
                pacMan.reset();
                Guardian.resetGuardians(guardians, LevelsDesign[level].guardiansPositions);
                game.pause = false;
            }, 2000);
        }

        function displayLives(lives) {
            var x;
            var y;

            for (var i = 0; i < lives; i++) {
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
        function updateHighScores() {
            var highScoreBoard = document.getElementById('high-score-board');
            var highScoresCount = 10;
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
            for (var i = 0; i < highScoresCount; i++) {
                var highScore = sortedScores[i];
                if (highScore && highScore !== undefined) {
                    var scoreListItem = document.createElement('li');
                    scoreListItem.innerText = localStorage[highScore] + ' : ' + highScore;	//localStorage[highScore] = name
                    highScoreBoard.appendChild(scoreListItem);
                }
            }
        };
    });
})();