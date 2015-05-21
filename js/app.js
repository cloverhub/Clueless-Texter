var symbols = {
	star : "\u2605",
	smiley : "\u263A"
};
var sounds = {
	"squish" : new Audio("sounds/squish.wav"),
	"yipee" : new Audio("sounds/yipee.wav"),
	"yay" : new Audio("sounds/yay.wav")
};

var InfoDisplay = function() {};

// Set 6 different enemy types
var EnemyBicycleBottom = function(x,y) {
	this.sprite = 'images/enemy-bicycle-bottom.png';
	this.x = x;
	this.y = y;
};

var EnemyCarBottom = function(x,y) {
	this.sprite = 'images/enemy-car-bottom.png';
	this.x = x;
	this.y = y;
};

var EnemyTrainBottom = function(x,y) {
	this.sprite = 'images/enemy-train2.png';
	this.x = x;
	this.y = y;
};

var EnemyTrainTop = function(x,y) {
	this.sprite = 'images/enemy-train1.png';
	this.x = x;
	this.y = y;
};

var EnemyCarTop = function(x,y) {
	this.sprite = 'images/enemy-car-top.png';
	this.x = x;
	this.y = y;
};

var EnemyBicycleTop = function(x,y) {
	this.sprite = 'images/enemy-bicycle-top.png';
	this.x = x;
	this.y = y;
};

// Set player
var Player = function(x,y) {
	this.playerImage = 'images/char-texter.png';
	this.x = x;
	this.y = y;
};

// Update the enemy positions
EnemyBicycleBottom.prototype.update = function(dt) {
	this.x += ((Math.random()* 100) + (bugSpeed / 1.8)) * dt;
	// Check for collision
	if ((this.x - player.x <  50 && this.y - player.y < 50) && 
		(this.x - player.x > -50 && this.y - player.y > -50)) {
		PlayerCrash();
	}
	// Check if lower bicycle has reached the right end, then reset to random starting point
	if (this.x > 600) {
		this.x = -((Math.random()*500));
	}
};

EnemyCarBottom.prototype.update = function(dt) {
	this.x += ((Math.random()* 100) + bugSpeed) * dt;
	// Check for collision
	if ((this.x - player.x <  50 && this.y - player.y < 50) && 
		(this.x - player.x > -50 && this.y - player.y > -50)) {
		PlayerCrash();
		}
	// Check if lower car has reached the right end, then reset to random starting point
	if (this.x > 600) {
		this.x = -((Math.random()*500));
		}
};

EnemyTrainBottom.prototype.update = function(dt) {
	this.x += ((Math.random()* 100) + bugSpeedFast) * dt;
	// Check for collision
	if ((this.x - player.x <  50 && this.y - player.y < 50) && 
		(this.x - player.x > -50 && this.y - player.y > -50)) {
		PlayerCrash();
		}
	// Check if lower train has reached the right end, then reset to random starting point
	if (this.x > 600) {
		this.x = -((Math.random()*300));
	}
};

EnemyTrainTop.prototype.update = function(dt) {
	this.x -= ((Math.random()* 100) + bugSpeedFast) * dt;
	// Check for collision
	if ((this.x - player.x <  50 && this.y - player.y < 50) && 
		(this.x - player.x > -50 && this.y - player.y > -50)) {
		PlayerCrash();
		}
	// Check if upper train has reached the left end, then reset to random starting point
	if (this.x < 1) {
		this.x = +((Math.random()*600)+800);
	}
};

EnemyCarTop.prototype.update = function(dt) {
	this.x -= ((Math.random()* 100) + bugSpeed) * dt;
	// Check for collision
	if ((this.x - player.x <  50 && this.y - player.y < 50) && 
		(this.x - player.x > -50 && this.y - player.y > -50)) {
		PlayerCrash();
		}
	// Check if upper car has reached the left end, then reset to random starting point
	if (this.x < 1) {
		this.x = +((Math.random()*600)+800);
	}
};

EnemyBicycleTop.prototype.update = function(dt) {
	this.x -= ((Math.random()* 100) + (bugSpeed / 1.8)) * dt;
	// Check for collision
	if ((this.x - player.x <  50 && this.y - player.y < 50) && 
		(this.x - player.x > -50 && this.y - player.y > -50)) {
		PlayerCrash();
		}
	// Check if upper bicycle has reached the left end, then reset to random starting point
	if (this.x < 1) {
		this.x = +((Math.random()*600)+800);
	}
};

// Draw the enemies
EnemyBicycleBottom.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

EnemyCarBottom.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

EnemyTrainBottom.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

EnemyTrainTop.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

EnemyCarTop.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

EnemyBicycleTop.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the player
Player.prototype.update = function(dt) {
	this.playerImg = this.playerImage;
	this.x * dt;
	this.y * dt;
};

// Update the player position
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.playerImg), this.x, this.y);
};

// Display score and number of lives
InfoDisplay.prototype.render = function() {
	ctx.font="56px Verdana";
	ctx.fillStyle = "rgba(255, 255, 255, 1)";
	ctx.textAlign = "right";
	ctx.fillText(gameLevel - 1,80,115,ctx.canvas.height);
	if (lifeNumber === 3) {
		ctx.fillText(symbols.star + symbols.star,690,115,ctx.canvas.height);
	}
	if (lifeNumber === 2) {
		ctx.fillText(symbols.star,690,115,ctx.canvas.height);
	}
	if (lifeNumber === 0) {
	GameOver();
	}
};

// Instantiate objects
var infodisplay = new InfoDisplay();
var player = new Player(304,498);
var enemyBicycleTop = new EnemyBicycleTop((Math.random()*2000),0);
var enemyCarTop2 = new EnemyCarTop((Math.random()*2000),83);
var enemyTrain1 = new EnemyTrainTop((Math.random()*2000),166);
var enemyTrain2 = new EnemyTrainBottom((Math.random()*2000),249);
var enemyCarBottom1 = new EnemyCarBottom((Math.random()*2000),332);
var enemyBicycleBottom = new EnemyBicycleBottom((Math.random()*2000),415);
allEnemies = [enemyBicycleTop, enemyCarTop2, enemyTrain1, enemyTrain2, enemyCarBottom1, enemyBicycleBottom];

// If player collides subtract a life and reset player
var PlayerCrash = function() {
	sounds.squish.play();
	lifeNumber = lifeNumber - 1;
	if (lifeNumber === 0 && gameLevel > 10) {
		sounds.yay.play();
	}
	player.reset();
};

// If player reaches end, increase score, increase enemy speed, and reset
var PlayerSuccess = function() {
	sounds.yipee.play();
	gameLevel = gameLevel + 1;
	bugSpeed  = bugSpeed + (bugSpeed + gameLevel) * 3.5 / (gameLevel * gameLevel);
	bugSpeedFast  = bugSpeedFast + (bugSpeedFast + gameLevel) * 3.5 / (gameLevel * gameLevel);
	player.reset();
};

// If lives = 0, end game and wait for esc key
var GameOver = function() {
	ctx.font = "56px Verdana";
	ctx.fillStyle = "rgba(255, 255, 255, 1)";
	ctx.textAlign = "center";
	ctx.fillText("GAME OVER, LOL" + symbols.smiley,370,298,ctx.canvas.height);
	ctx.font = "24px Verdana";
	ctx.fillText("press Esc for new game",370,372,ctx.canvas.height);
	Player.prototype.handleInput = function(keynum) {
		switch(keynum) {
			case 'escape': NewGame();
		}
	};
};

// Function to start new game by defining allowed keys and setting starting variables
var NewGame = function() {
	Player.prototype.handleInput = function(keynum) {
		switch(keynum) {
			case 'up':
			if(this.y > 50) {
				this.y = this.y - 83;
			}
			// player hits end: add to game level and run reset function
			else {
				PlayerSuccess();
			}
			break;
			case 'down':
			if(this.y < 498) {
				this.y = this.y + 83;
			}
			break;
			case 'left':
			if(this.x > 10) {
				this.x = this.x - 100;
			}
			break;
			case 'right':
			if(this.x < 600) {
				this.x = this.x + 100;
			}
			break;
			case 'escape': NewGame();
			default: return;
		}
	};
	lifeNumber = 3;
	gameLevel = 1;
	bugSpeed = 60;
	bugSpeedFast = 130;
};

NewGame(); // Start the new game

// Reset player position to start
Player.prototype.reset = function() {
	this.x = 304;
	this.y = 498;
};

// Listen for key presses and sends the keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		27: 'escape'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});;