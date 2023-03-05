const simonButtons = document.getElementsByClassName("square");
const startButton = document.getElementById("startButton");

class SimonSays {
  constructor(simonButtons, startButton) {
    this.round = 0;
    this.userPosition = 0;
    this.sequence = [];
    this.blockedButtons = true;
    this.buttons = Array.from(simonButtons);
    this.startButton = startButton;
    this.buttonSounds = [
      new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
      new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
      new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
      new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
    ];
  }
  init() {
    this.startButton.onclick = () => this.startGame();
  }

  startGame() {
    this.startButton.disabled = true;
    this.updateRound(0);
    this.userPosition = 0;
    this.sequence = this.createSequence();
    this.buttons.forEach((element, i) => {
      element.onclick = () => this.buttonClick(i);
    });
    this.showSequence();
  }
  updateRound(value) {
    this.round = value;
  }
  createSequence() {
    return Array.from({ length: 20 }, () => this.getRandomColor());
  }
  getRandomColor() {
    return Math.floor(Math.random() * 4);
  }

  buttonClick(value) {
    !this.blockedButtons && this.validateChosenColor(value);
  }
  validateChosenColor(value) {
    if (this.sequence[this.userPosition] === value) {
      this.buttonSounds[value].play();
      if (this.round === this.userPosition) {
        this.updateRound(this.round + 1);
        this.isGameOver();
      } else {
        this.userPosition++;
      }
    } else {
      this.gameLost();
    }
  }
  isGameOver() {
    if (this.round === 20) {
      this.gameWon();
    } else {
      this.userPosition = 0;
      this.showSequence();
    }
  }
  showSequence(value) {
    this.blockedButtons = true;
    let sequenceIndex = 0;
    let timer = setInterval(() => {
      const button = this.buttons[this.sequence[sequenceIndex]];
      this.toggleButtonStyle(button);
      setTimeout(() => this.toggleButtonStyle(button), 500);
      sequenceIndex++;
      if (sequenceIndex > this.round) {
        this.blockedButtons = false;
        clearInterval(timer);
      }
    }, 1000);
  }
  toggleButtonStyle(button) {
    button.classList.toggle("active");
  }
  gameLost() {
    this.startButton.disabled = false;
    this.blockedButtons = true;
  }
  gameWon() {}
}

const juego = new SimonSays(simonButtons, startButton);
juego.init();
