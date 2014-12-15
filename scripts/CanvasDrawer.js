//TO DO
define(function () {
    'use strict'
    var CanvasDrawer = (function () {

        var CanvasDrawer = function CanvasDrawer() {
        };

        var canvas = document.getElementById("canvas");
        CanvasDrawer.ctx = canvas.getContext("2d");
        CanvasDrawer.imagePacman = new Image();
        CanvasDrawer.imagePacman.src = 'pacman sprite.png';

        CanvasDrawer.prototype = {
            DrawPacman: function (positionX, positionY, r, direction, frame) {

                // draw cropped image
                var spriteX = [0, 40, 80, 118, 80, 40];
                var spriteY = [0, 40, 82, 122, 82, 40];
                if (direction == 'right') {
                    var sourceX = spriteX[frame];
                    var sourceY = 2;
                }
                else if (direction == 'left') {
                    var sourceX = spriteX[frame];
                    var sourceY = 44;
                }
                else if (direction == 'up') {
                    var sourceX = 2;
                    var sourceY = 86 + spriteY[frame];
                }
                else if (direction == 'down') {
                    var sourceX = 42;
                    var sourceY = 86 + spriteY[frame];
                }

                CanvasDrawer.ctx.drawImage(CanvasDrawer.imagePacman, sourceX, sourceY, 39, 43, positionX - r, positionY - r, 40, 44);
            }
        };

        return CanvasDrawer;
    })();

    return new CanvasDrawer();
});