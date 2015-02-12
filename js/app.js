// Draw game environment elements on the screenm e.g. game level no.
var bugSpeed = 45;
var bugSpeedFast = 130;
var gameLevel = 1;
var lifeNumber = 3;
var InfoDisplay = function(){}


var EnemyCarBottom = function(x,y) {
	this.sprite = 'images/enemy-car-bottom.png';
	this.x = x;
	this.y = y;
}

var EnemyCarTop = function(x,y) {
	this.sprite = 'images/enemy-car-top.png';
	this.x = x;
	this.y = y;
}

var EnemyTrainOne = function(x,y) {
	this.sprite = 'images/enemy-train1.png';
	this.x = x;
	this.y = y;
}

var EnemyTrainTwo = function(x,y) {
	this.sprite = 'images/enemy-train2.png';
	this.x = x;
	this.y = y;
}

var Player = function(x,y) {
	this.playerImage = 'images/char-texter.png';
	this.x = x;
	this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
EnemyCarBottom.prototype.update = function(dt) {
	this.x += ((Math.random()* 100) + bugSpeed) * dt;
	// Check for collision between bottom cars and player 
	if ((this.x - player.x <  50 && this.y - player.y < 50) && 
		(this.x - player.x > -50 && this.y - player.y > -50)) {
		PlayerCrash();
	}
	// Check if car has reached the right end, then reset car's location to random starting point
	if (this.x > 600) {
	   this.x = -((Math.random()*500));
	}
}

EnemyCarTop.prototype.update = function(dt) {
	this.x -= ((Math.random()* 100) + bugSpeed) * dt;
	// Check for collision between top cars and player 
	if ((this.x - player.x <  50 && this.y - player.y < 50) && 
		(this.x - player.x > -50 && this.y - player.y > -50)) {
		PlayerCrash();
	}
	// Check if car has reached the right end, then reset car's location to random starting point
	if (this.x < 1) {
	   this.x = +((Math.random()*600)+800);
	}
}

EnemyTrainOne.prototype.update = function(dt) {
	this.x -= ((Math.random()* 100) + bugSpeedFast) * dt;
	// Check for collision between top train and player 
	if ((this.x - player.x <  50 && this.y - player.y < 50) && 
		(this.x - player.x > -50 && this.y - player.y > -50)) {
		PlayerCrash();
	}
	// Check if train has reached the right end, then reset trains's location to random starting point
	if (this.x < 1) {
	   this.x = +((Math.random()*600)+800);
	}
}

EnemyTrainTwo.prototype.update = function(dt) {
	this.x += ((Math.random()* 100) + bugSpeedFast) * dt;
	// Check for collision between bottom train and player 
	if ((this.x - player.x <  50 && this.y - player.y < 50) && 
		(this.x - player.x > -50 && this.y - player.y > -50)) {
		PlayerCrash();
	}
	// Check if train has reached the right end, then reset trains's location to random starting point
	if (this.x > 600) {
	   this.x = -((Math.random()*300));
	}
}

// Draw the enemy on the screen, required method for game
EnemyCarBottom.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

EnemyCarTop.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

EnemyTrainOne.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

EnemyTrainTwo.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

InfoDisplay.prototype.render = function() {
	// Draw other game specific details like game level
	ctx.font="56px Verdana";
	ctx.fillStyle = "rgba(255, 255, 255, 1)";
	ctx.textAlign = "left";
	ctx.fillText(gameLevel - 1 + "                 Lives: " + lifeNumber,55,105,ctx.canvas.height);
	if (lifeNumber === 0) {
	GameOver();
	}
}

Player.prototype.update = function(dt) {
	this.playerImg = this.playerImage;
	this.x * dt;
	this.y * dt;
}

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
			if(this.y < 550){
				this.y = this.y + 83;
			}
			break;
		case 'left':
			if(this.x > 10){
				this.x = this.x - 100;
			}
			break;
		case 'right':
			if(this.x < 600){
				this.x = this.x + 100;
			}
			break;
		case 'escape':
			NewGame();
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
var infodisplay = new InfoDisplay();
var player = new Player(304,568);
var enemyCarTop1 = new EnemyCarTop((Math.random()*2000),60);
var enemyCarTop2 = new EnemyCarTop((Math.random()*2000),143);
var enemyTrain1 = new EnemyTrainOne((Math.random()*2000),226);
var enemyTrain2 = new EnemyTrainTwo((Math.random()*2000),309);
var enemyCarBottom1 = new EnemyCarBottom((Math.random()*2000),392);
var enemyCarBottom2 = new EnemyCarBottom((Math.random()*2000),475);
allEnemies = [enemyCarTop1, enemyCarTop2, enemyTrain1, enemyTrain2, enemyCarBottom1, enemyCarBottom2];

// If player collides subtract a life and reset player
var PlayerCrash = function() {
	lifeNumber = lifeNumber - 1;
	player.reset();
}

var PlayerSuccess = function() {
	gameLevel = gameLevel + 1;
	bugSpeed  = bugSpeed + (bugSpeed + gameLevel) * 3.5 / (gameLevel * gameLevel);
	bugSpeedFast  = bugSpeedFast + (bugSpeedFast + gameLevel) * 3.5 / (gameLevel * gameLevel);
	player.reset();
}

var GameOver = function() {
	ctx.font="56px Verdana";
	ctx.fillStyle = "rgba(255, 255, 255, 1)";
	ctx.textAlign = "center";
	ctx.fillText("GAME OVER",370,380,ctx.canvas.height);
	ctx.font="24px Verdana";
	ctx.fillText("press Esc for new game",370,420,ctx.canvas.height);
	Player.prototype.handleInput = function(keynum) {
		switch(keynum) {
			case 'escape':
				NewGame();
			default:
				return;
		}
	}
}

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
			if(this.y < 550){
				this.y = this.y + 83;
			}
			break;
		case 'left':
			if(this.x > 10){
				this.x = this.x - 100;
			}
			break;
		case 'right':
			if(this.x < 600){
				this.x = this.x + 100;
			}
			break;
		case 'escape':
			NewGame();
		default:
			return;
	}
}; 
	lifeNumber = 3;
	gameLevel = 1;
	player.reset();
}

// Increase enemy speed and reset player position to start
Player.prototype.reset = function() {
	this.x = 304;
	this.y = 568;
}

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
});
