// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed){
    this.sprite = 'images/enemy-bug.png';
    this.x = -32;
    this.y = y;
    this.speed = speed;
  };

  update(dt) {
    this.x += this.speed * dt;
    if (this.x >= 707) {
     this.x = -83;
     this.speed = 100 * Math.floor(Math.random() * 4 + 1);
    }

    // hit boxes
  };
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(){
    this.sprite = 'images/char-boy.png';
    this.x = 303;
    this.y = 404;
  }
  update(){

  }
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(movement){

    switch (movement) {
      case 'left':
      this.x >= 101 ? this.x -= 101 : this.x -= 0;
      break;

      case 'up':
      if (this.y >= 83) {
          this.y -= 83
      }else {
        this.x = 303;
        this.y = 404;
        //score++;
      }

      break;

      case 'right':
      this.x >= 606 ? this.x += 0 : this.x += 101 ;

      break;

      case 'down':
      this.y >= 404 ? this.y += 0 : this.y += 83;

      break;
    }

  }
}

//let scorePanel = document.createElement(div)

// Now instantiate your objects.
const newPlayer = new Player();
const enemyTop = new Enemy(-32, 60, 100);
const enemyMid = new Enemy(-32, 140, 200);
const enemyBot = new Enemy(-32, 220, 150);
// Place all enemy objects in an array called allEnemies
let allEnemies = [enemyTop, enemyMid,enemyBot];
// Place the player object in a variable called player
let player = newPlayer;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// additional syles for the score box
const container = document.createElement('div');
container.setAttribute('class', 'scorePanel');
