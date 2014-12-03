function drawField(fieldWalls, cellHeight, wallHeight) {

    var svgNS = 'http://www.w3.org/2000/svg';

    for (var i = 0; i < fieldWalls.length; i++) {
        var y = cellHeight * (~~(i / 2));
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

    //TODO union
    var signUp = document.createElementNS(svgNS, 'text');
    signUp.setAttribute('x', 412);
    signUp.setAttribute('y', 190);
    signUp.innerHTML = 'JavaScript';
    document.getElementById('game').appendChild(signUp);

    var signDown = document.createElementNS(svgNS, 'text');
    signDown.setAttribute('x', 430);
    signDown.setAttribute('y', 220);
    signDown.innerHTML = 'Museum';
    document.getElementById('game').appendChild(signDown);

    var levelSignUp = document.createElementNS(svgNS, 'text');
    levelSignUp.setAttribute('x', 18);
    levelSignUp.setAttribute('y', 85);
    levelSignUp.innerHTML = 'level';
    document.getElementById('game').appendChild(levelSignUp);
}