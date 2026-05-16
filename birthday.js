const birthdayText = document.getElementById('birthday-text');
const restartBtn = document.getElementById('restart-btn');
const countdownEl = document.getElementById('countdown');
const timerEl = document.getElementById('timer');
const balloonContainer = document.querySelector('.balloon-container');
const confettiContainer = document.querySelector('.confetti-container');

const birthdayMessages = [

'1 day to go… 🌸',

'Tomorrow is not just a birthday, Akka… it’s a reminder that someone truly precious came into this world 🤍',

'Some people make others feel valued without even trying, and you are one of them, Akka ✨',

'In a world where many relationships fade quickly, your presence feels rare, calm, and genuine 🌷',

'The comfort, trust, and memories this bond gave me will always stay special, Akka 💖',

'Just 1 day left until we celebrate the beautiful soul called Akka Garu 🎂🌙',
];

let timerInterval = null;

const countdownTarget = (() => {
  const now = new Date();
  const currentYear = now.getFullYear();

  // May = month 4
  const target = new Date(currentYear, 4, 18, 0, 0, 0);

  return target > now
    ? target
    : new Date(currentYear + 1, 4, 18, 0, 0, 0);
})();

function formatTimerValue(value) {
  return String(value).padStart(2, '0');
}

function updateTimer() {
  const totalSeconds = Math.max(
    0,
    Math.floor((countdownTarget - new Date()) / 1000)
  );

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownEl.textContent = days;

  timerEl.textContent =
    `${formatTimerValue(days)}d ` +
    `${formatTimerValue(hours)}h ` +
    `${formatTimerValue(minutes)}m ` +
    `${formatTimerValue(seconds)}s`;
}

function startTimer() {
  clearInterval(timerInterval);

  updateTimer();

  timerInterval = setInterval(updateTimer, 1000);
}

function renderBirthdayMessages() {
  birthdayText.innerHTML = '';

  birthdayMessages.forEach((message, index) => {
    const line = document.createElement('p');

    line.className = 'message-line';

    line.style.animationDelay = `${index * 0.3}s`;

    line.innerHTML = message;

    birthdayText.appendChild(line);
  });

  const finale = document.createElement('div');

  finale.className = 'final-emoji';

  finale.innerHTML = '🎉';

  birthdayText.appendChild(finale);
}

function restartStory() {
  renderBirthdayMessages();
  startTimer();
}

function createBalloon() {
  const balloon = document.createElement('div');

  balloon.className = 'balloon';

  const size = 20 + Math.random() * 20;

  balloon.style.width = `${size}px`;
  balloon.style.height = `${size * 1.3}px`;

  balloon.style.left = `${Math.random() * 95}vw`;

  balloon.style.animationDuration = `${8 + Math.random() * 5}s`;

  balloonContainer.appendChild(balloon);

  setTimeout(() => {
    balloon.remove();
  }, 12000);
}

function createConfetti() {
  const piece = document.createElement('span');

  piece.className = 'confetti-piece';

  piece.style.left = `${Math.random() * 100}vw`;

  piece.style.animationDuration = `${4 + Math.random() * 3}s`;

  confettiContainer.appendChild(piece);

  setTimeout(() => {
    piece.remove();
  }, 7000);
}

function startBackgroundEffects() {
  setInterval(createBalloon, 1500);

  setInterval(createConfetti, 500);
}

restartBtn.addEventListener('click', restartStory);

window.onload = () => {
  restartStory();
  startBackgroundEffects();
};
