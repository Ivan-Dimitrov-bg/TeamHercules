/// <reference path="game.js" />
/// <reference path="../libraries/require.js" />
(function () {
    require.config({
        paths: {
            "game": "game",
            "pacman": "pacman",
            "additionalFunctions": "additionalFunctions",
        }
    });

    require(["game", "additionalFunctions"], function (game) {
    });
}());