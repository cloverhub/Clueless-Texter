// Draw game environment elements on the screenm e.g. game level no.
var bugSpeed = 50;
var bugSpeedFast = 150;
var gameLevel = 1; 
var GameEnv = function() {
	this.sprite = 'images/Heart.png';
}
GameEnv.prototype.render = function() {
	// Draw other game specific details like game level
	ctx.font="25px Verdana";
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.textAlign = "left";
	ctx.fillText("Level " + gameLevel,203,575,ctx.canvas.height); 
}

// Enemies our player must avoid
var Enemy = function(x,y) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
}

var EnemyBlack = function(x,y) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug-black.png';
	this.x = x;
	this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += Math.round((Math.random()* 100) + bugSpeed) * dt;

	// Check for collision between bugs and player 
	// Reset player to starting position when any of the bugs collides with the player
	if ((this.x - player.x <  50 && this.y - player.y < 50) && 
		(this.x - player.x > -50 && this.y - player.y > -50)) {
		player.reset();
	}

	// Check if bug location has reached the right end, then reset bug's location to random starting point
	if (this.x > 600) {
	   this.x = -(Math.round(Math.random()*500));
	}
}

EnemyBlack.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += Math.round((Math.random()* 100) + bugSpeedFast) * dt;

	// Check for collision between bugs and player 
	// Reset player to starting position when any of the bugs collides with the player
	if ((this.x - player.x <  50 && this.y - player.y < 50) && 
		(this.x - player.x > -50 && this.y - player.y > -50)) {
		player.reset();
	}

	// Check if bug location has reached the right end, then reset bug's location to random starting point
	if (this.x > 600) {
	   this.x = -(Math.round(Math.random()*500));
	}
}



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

EnemyBlack.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
	this.playerImage = 'images/char-boy.png';
	this.x = x;
	this.y = y;
}

Player.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.

	this.playerImg = this.playerImage;
	this.x * dt;
	this.y * dt;
}

Player.prototype.handleInput = function(keynum) {
	switch(keynum)  {
		case 'up':
			if(this.y > 50) {
				this.y = this.y - 83;
			}
			else {
				// this means player hits water, reset to initial position
				// increase bugSpeed everytime player is able to reach the water
				// this way game difficulty is increased as well
				bugSpeed  = bugSpeed + (bugSpeed + gameLevel) * 1.5/ (gameLevel * gameLevel);
				bugSpeedFast  = bugSpeedFast + (bugSpeedFast + gameLevel) * 1.5/ (gameLevel * gameLevel);
				gameLevel = gameLevel + 1;
				setTimeout(function(){player.reset()},1250);
				// player.reset();
			}
			break;
		case 'down':
			if(this.y < 550){
				this.y+=83;
			}
			break;
		case 'left':
			if(this.x > 15){
				this.x-=100;
			}
			break;
		case 'right':
			if(this.x < 600){
				this.x+=100;
			}
			break;
		default:
			return;
	}
};  

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.playerImg), this.x, this.y);
}
	


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(304,568);
var enemy1 = new Enemy(Math.round(Math.random()*1000),60);
var enemy2 = new Enemy(Math.round(Math.random()*100),143);
var enemy1Black = new EnemyBlack(Math.round(Math.random()*100),226);
var enemy3 = new Enemy(Math.round(Math.random()*100),309);
var enemy4 = new Enemy(Math.round(Math.random()*100),392);
var enemy5 = new Enemy(Math.round(Math.random()*100),475);
allEnemies = [enemy1, enemy2, enemy1Black, enemy3, enemy4, enemy5];


// Reset player position to starting point 
Player.prototype.reset = function() {
	// Default starting point for player, 
	// prefer to start always in middle of screen
	this.x = 304;
	this.y = 568;
}




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
