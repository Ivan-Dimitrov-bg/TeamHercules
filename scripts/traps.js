function setTrap() {
	var trapsAll = [{
		'question': 'What is the type of NaN?',
		'a': 'NaN has a type?!',
		'b': 'number',
		'c': 'undefined',
		'correct': 'b'
	}, {
	    'question': 'How do you create a variable zap that is equal to the string "Whazaaaaap?"?',
	    'a': 'string zap = "Whazaaaaap?";',
	    'b': 'var zap = "Whazaaaaap?"',
	    'c': 'I shout at my screen "Whazaaaaap?"',
		'correct': 'b'
	}, {
		'question': 'How do you create a <div> element using JavaScript?',
		'a': 'document .createElement("div")',
		'b': 'document .getElementByTagName("div")',
		'c': 'I had no idea I could do that.',
		'correct': 'a'
	}, {
		'question': 'Who should have a statue raised in the JavaScript Museum?',
		'a': 'Gosho',
		'b': 'Pesho',
		'c': 'Both',
		'correct': 'c'
	}, {
		'question': 'How do you add a comment in JavaScript?',
		'a': 'I just share my opinion.',
		'b': '<!--This is a comment.-->',
		'c': '//This is a comment.',
		'correct': 'c'
	}
	],
	trapsAllLength = trapsAll.length,
	randomTrapIndex = getRandomValue(0, trapsAllLength - 1),
	playerAnswer = '',
	x = 0,
	y = 0,
	text = '',
	textWidth = 0;

//draw
	var stage = new Kinetic.Stage({
        container: 'kinetic',
        width: ctx.canvas.width,
        height: ctx.canvas.height
      });
     
	var layer = new Kinetic.Layer();
	
	function drawTrapBubble() {
		var trapBubble = new Kinetic.Rect({
			x: stage.width() / 2 - (stage.width() * 0.75) / 2,		//center
			y: stage.height() / 2 - (stage.height() * 0.75) / 2,	//center
			width: stage.width() * 0.75,
			height: stage.height() * 0.75,
			fill: 'black',
			stroke: 'purple',
			strokeWidth: 4,
			cornerRadius: 10
		  });	
		layer.add(trapBubble);
		return trapBubble;
	}
	
	function drawText(text, layer, x, y, fillColor, fontSize, padding, width, letter) {
		var newText = new Kinetic.Text({
			x: x,
			y: y,
			text: text,
			fontSize: fontSize,
			fontFamily: 'Calibri',
			fill: fillColor,
			width: width,
			padding: padding,
			align: 'center',
			id: letter,
		});
		newText.offsetX(newText.width()/2);		//center
		layer.add(newText);
		return newText;
	}
//draw	
	var trapBubble = drawTrapBubble();
//heading	
	text = 'Uh oh! You fell into a trap!';
	x = trapBubble.x() + trapBubble.width() / 2;
	y = trapBubble.y();
	textWidth = trapBubble.width();

	drawText(text, layer, x, y, 'yellow', 30, 20, textWidth);
//tip		
	text = 'Seems like the JavaScript Guardians won\'t let you steal the museum\'s treasures so easily. Solve the riddle below to become faster for a while. But be careful! If your answer is wrong, you\'ll become slower.';
	y = trapBubble.y() + 40;

	drawText(text, layer, x, y, '#888', 15, 20, textWidth);	
//question	
	text = trapsAll[randomTrapIndex]['question'];
	y = trapBubble.y() + 100;
	
	drawText(text, layer, x, y, 'yellowgreen', 30, 20, textWidth);
//answers
//a
	x = trapBubble.x() + trapBubble.width() / 2 - trapBubble.width() / 3;
	y = trapBubble.y() + trapBubble.height() - 30 - 50;
	text = 'a) ' + trapsAll[randomTrapIndex]['a'];
	textWidth = trapBubble.width() / 3;
	
	var trapAnswerA = drawText(text, layer, x, y, 'yellowgreen', 22, 2, textWidth, 'a');
//b	
	x = trapBubble.x() + trapBubble.width() / 2;
	text = 'b) ' + trapsAll[randomTrapIndex]['b'];
	
	var trapAnswerB = drawText(text, layer, x, y, 'yellowgreen', 22, 2, textWidth, 'b');
//c
	x = trapBubble.x() + trapBubble.width() / 2 + trapBubble.width() / 3;
	text = 'c) ' + trapsAll[randomTrapIndex]['c'];
	
	var trapAnswerC = drawText(text, layer, x, y, 'yellowgreen', 22, 2, textWidth, 'c');
//add layer to stage
	stage.add(layer);
	
//pick answer
	function onPickTrapAnswerKeydown() {

		window.addEventListener('keydown', function (ev) {
			
			var keyChar = String.fromCharCode(ev.keyCode).toLowerCase();		//gets char on pressed key
			
			if (ev.keyCode === 65) {
				playerAnswer = keyChar;
				checkIfTrueAnswer();
				hideLayer(layer);
				game.pause = false;
			}
			if (ev.keyCode === 66) {
				playerAnswer = keyChar;
				checkIfTrueAnswer();
				hideLayer(layer);
                game.pause = false;
			}
			if (ev.keyCode === 67) {
				playerAnswer = keyChar;
				checkIfTrueAnswer();
				hideLayer(layer);
                game.pause = false;
			}
		});		
	}
	
	function onPickTrapAnswerClick (trapAnswer) {
		trapAnswer.on('click', function() {
			playerAnswer = this.id();
			checkIfTrueAnswer();
			hideLayer(layer);
		});
	}
	onPickTrapAnswerKeydown(layer);
	onPickTrapAnswerClick(trapAnswerA, layer);
	onPickTrapAnswerClick(trapAnswerB, layer);
	onPickTrapAnswerClick(trapAnswerC, layer);

//check if answer is correct or not
	function checkIfTrueAnswer() {		
	    if (playerAnswer == trapsAll[randomTrapIndex]['correct']) {
		    score += 100;
			//make pacMan faster
			//pacManSpeed += 2;								//TODO
			//reset speed after 10 seconds
			//setTimeout (resetPacmanSpeed, 10000);
			//console.log('true');
		} else {
			//slow pacMan down
			//pacManSpeed -=2;								//TODO
			//reset speed after 10 seconds
			//setTimeout (resetPacmanSpeed, 10000);
			//console.log('false');
		}
	}
	function hideLayer(layer) {		
		//layer.hide();
		layer.remove();
	}
}
