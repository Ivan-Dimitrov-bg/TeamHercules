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
		ctx.quadraticCurveTo(this.x - this.radius * 0.60, this.y + this.radius * 0.670, this.x, this.y);
		ctx.lineTo(this.x + this.radius * 0.60, this.y + this.radius * 0.60);
		ctx.arc(this.x, this.y, this.radius, Math.PI, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = this.fillColor;
		ctx.strokeStyle = this.strokeColor;
		ctx.lineWidth = 6;
		ctx.stroke();
    	ctx.fill();
		//eyes
		ctx.beginPath();
		ctx.arc(this.x + radius/4, this.y - this.radius / 2, this.radius / 5, 0, 2 * Math.PI);
		ctx.arc(this.x - radius/4, this.y - this.radius / 2, this.radius / 5, 0, 2 * Math.PI);
		ctx.fillStyle = 'white';
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.stroke();
    	ctx.fill();
		//pupils
		ctx.beginPath();
		ctx.arc(this.x + radius/4, this.y - this.radius / 2, 1, 0, 2 * Math.PI);
		ctx.arc(this.x - radius/4, this.y - this.radius / 2, 1, 0, 2 * Math.PI);
		ctx.fillStyle = 'black';
		ctx.lineWidth = 1;
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
    };
	
	this.detectWallCollision = function (maxX, maxY) {		//TODO

        // if (detectCollisionsWithWalls(direction, this.x, this.y)) {
			
			// this.direction = changeGuardianDirection();
		// }
	//outside walls	- remove later
		if (this.x < this.radius) {
			 this.direction = "right";
		 }
		 if (this.x > maxX - this.radius) {
			 this.direction = "left";
		 }
		 if (this.y < this.radius) {
			this.direction = "down";
		 }
		 if (this.y > maxY - this.radius) {
			this.direction = "up";
		 }
	    //adding here 
	};
}

function changeGuardianDirection() {		//TODO
	return direction = randomDirection();
}
