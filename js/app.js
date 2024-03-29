// additional DOM elements for the score box
const body = document.querySelector('body');
const panel = document.createElement('div');
panel.setAttribute('class', 'scorePanel');
body.appendChild(panel);

let score = 0;
const scoreCount = document.createElement('p')
scoreCount.innerHTML = 'Score: ' + score;
panel.appendChild(scoreCount);


// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed){
    this.sprite = 'images/enemy-bug.png';
    this.x = y;
    this.y = y;
    this.speed = 100 * Math.floor(Math.random() * 4 + 1);
  };

  update(dt) {
    this.x += this.speed * dt;
    if (this.x >= 707) {
     this.x = -83;
     this.speed = 100 * Math.floor(Math.random() * 4 + 1);
    }

    if (player.x < this.x + 72 &&
        player.x + 69 > this.x &&
        player.y < this.y + 64 &&
        64 + player.y > this.y) {
        player.x = 303;
        player.y = 404;
        gameOver();
    };
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
    this.sprite = 'images/char-horn-girl.png';
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

      } else {

        this.x = 303;
        this.y = 404;
        score += 10;
        scoreCount.innerHTML = 'Score: ' + score;

      }
      break;

      case 'right':
      this.x >= 606 ? this.x += 0 : this.x += 101;
      break;

      case 'down':
      this.y >= 404 ? this.y += 0 : this.y += 83;
      break;
    }
  }
}


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
const keys = function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        87: 'up',
        65: 'left',
        83: 'down',
        68: 'right'
    };

    player.handleInput(allowedKeys[e.keyCode]);
};

document.addEventListener('keyup', keys);

// game over pop up message

function gameOver(){
  const body = document.querySelector('body');
  const panel = document.createElement('div');
  panel.setAttribute('class','gameOver');

  body.appendChild(panel);

  const msg = document.createElement('p');
  msg.textContent = 'Game Over! \r\n You scored ' + score + ' points';
  panel.appendChild(msg);

  const playAgian = document.createElement('button');
  playAgian.setAttribute('class', 'btn');
  playAgian.textContent = 'Play Again';
  panel.appendChild(playAgian);

  playAgian.onclick = function() {
    score = 0;
    scoreCount.innerHTML = 'Score: ' + score;
    panel.parentNode.removeChild(panel);
    document.addEventListener('keyup', keys);

  }

  document.removeEventListener('keyup', keys);
};
