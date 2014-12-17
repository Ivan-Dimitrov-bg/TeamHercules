/// <reference path="game.js" />
/// <reference path="../libraries/require.js" />
(function () {
    require.config({
        paths: {
            "game": "game",
            "pacman": "pacman",
            "guardians": "guardians",
            "additionalFunctions": "additionalFunctions",
        }
    });

    require(["game", "additionalFunctions"], function (game) {
    });
}());