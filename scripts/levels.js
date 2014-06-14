var LevelsDesign = [];

var level1 = {
    labyrinth:[
    "------------------- ",
    "|    |        |    |",
    "-- --  - -- - --  - ",
    "| |   ||||   |   | |",
    " - ---   ---  ----  ",
    "|| |   |    |||    |",
    "- - --  ---   - --  ",
    "|      ||  ||| || ||",
    "--  ---       -  -  ",
    "| || || |  | |  |  |",
    " - -    ---   -- -- ",
    "|   ||||    |||    |",
	" --    -  -- ---- - ",
    "||  | | ||       |||",
	" - -  -  -- --- -   ",
    "|    |     |       |",
    "------------------- "
],
    food:[	
	//x,y, orientation(vertical/horizontal), text
	[260, 33, 'h', 'function Pesho{return ""};'],
    [500, 335, 'h', '//this  is  comment'],
    [676, 15, 'v', 'var b = new BottleBear'],
    ]
};


LevelsDesign.push(level1);

function initializeFood(level){
	var food = LevelsDesign[level-1].food;
	var allLettersWithPositions = [];

    //for every food sequence
	for (var i = 0; i < food.length; i++) {
	    var currFood = food[i];
	    var x = currFood[0];
	    var y = currFood[1];
	    var orientation = currFood[2];
	    var text = currFood[3];
	    var lettersDistance = 12;

	    for (var j = 0; j < text.length; j++) {

	        if (orientation == 'v') {
	            y += lettersDistance;
	        }
            else if (orientation == 'h') {
	            x += lettersDistance;
            }

	        allLettersWithPositions.push(new Letter(x,y,text[j]));
	    }
	}

    function Letter(x, y, letter) {
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.orientation = orientation;
    }

    return allLettersWithPositions;
}

function drawLetters(allLettersWithPositions,ctx) {
    for (var i = 0; i < allLettersWithPositions.length; i++) {
        var letter = allLettersWithPositions[i];
        ctx.save();
        if (letter.orientation === 'v') {
            ctx.translate(letter.x, letter.y);
            ctx.rotate(Math.PI/2);
            ctx.translate(-letter.x, -letter.y);
            ctx.textAlign = "center";
        }
        //ctx.shadowColor = "rgba(232,144,220,0.5)";
        ctx.fillStyle = "rgba(230,230,230,1)";
        ctx.shadowOffsetX = 0;
	    ctx.shadowOffsetY = 0;
	    ctx.shadowBlur = 0;
        ctx.font="bold 12px Calibri";
        ctx.fillText(letter.letter, letter.x, letter.y);
        ctx.restore();

    }
}


