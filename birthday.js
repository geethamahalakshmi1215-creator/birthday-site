const birthdayText = document.getElementById('birthday-text');
const restartBtn = document.getElementById('restart-btn');
const countdownEl = document.getElementById('countdown');
const timerEl = document.getElementById('timer');
const balloonContainer = document.querySelector('.balloon-container');
const confettiContainer = document.querySelector('.confetti-container');

const birthdayMessages = [
  'Six days until your birthday - a gentle reminder of the love you inspire.',
  'Your kindness turns ordinary moments into memories that glow forever.',
  'This day celebrates you: your strength, your warmth, and your beautiful spirit.',
  'A new chapter is approaching, filled with hope, kindness, and quiet joy.',
  'I am grateful for every shared smile, every moment of support, and every kind word.',
  'Your birthday is a quiet promise that the best moments are still ahead.',
  'With all my heart, I wish you beauty, peace, and joy on this special day.',
  'Akka Garu, you are deeply cherished.',
];

let timerInterval = null;
let balloonTimeout = null;
let confettiTimeout = null;

const countdownTarget = (() => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const thisYearTarget = new Date(currentYear, 4, 18, 0, 0, 0);
  return thisYearTarget > now ? thisYearTarget : new Date(currentYear + 1, 4, 18, 0, 0, 0);
})();

function formatTimerValue(value) {
  return String(value).padStart(2, '0');
}

function updateTimer() {
  const totalSeconds = Math.max(0, Math.floor((countdownTarget - new Date()) / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownEl.textContent = days;
  timerEl.textContent = `${formatTimerValue(days)}d ${formatTimerValue(hours)}h ${formatTimerValue(minutes)}m ${formatTimerValue(seconds)}s`;
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
    line.style.animationDelay = `${index * 0.18}s`;
    line.textContent = message;
    birthdayText.appendChild(line);
  });

  const finale = document.createElement('div');
  finale.className = 'final-emoji';
  finale.style.animationDelay = `${birthdayMessages.length * 0.18}s`;
  finale.textContent = '\u{1F38A}';
  birthdayText.appendChild(finale);
}

function restartStory() {
  startTimer();
  renderBirthdayMessages();
}

function createBalloon() {
  const balloon = document.createElement('div');
  const size = 24 + Math.random() * 28;

  balloon.className = 'balloon';
  balloon.style.width = `${size}px`;
  balloon.style.height = `${size * 1.35}px`;
  balloon.style.left = `${Math.random() * 92}vw`;
  balloon.style.animationDuration = `${7 + Math.random() * 5}s`;
  balloon.style.background = `linear-gradient(180deg, rgba(255,255,255,0.95), rgba(${210 + Math.random() * 35}, ${95 + Math.random() * 120}, ${185 + Math.random() * 45}, 1))`;
  balloonContainer.appendChild(balloon);

  setTimeout(() => balloon.remove(), 13000);
}

function createConfetti() {
  const piece = document.createElement('span');
  const colors = ['#ffd166', '#ef476f', '#7df9ff', '#f8b4ff', '#caff8a'];

  piece.className = 'confetti-piece';
  piece.style.left = `${Math.random() * 100}vw`;
  piece.style.background = colors[Math.floor(Math.random() * colors.length)];
  piece.style.animationDuration = `${4 + Math.random() * 3}s`;
  piece.style.animationDelay = `${Math.random() * 0.7}s`;
  piece.style.transform = `rotate(${Math.random() * 180}deg)`;
  confettiContainer.appendChild(piece);

  setTimeout(() => piece.remove(), 8500);
}

function startBackgroundEffects() {
  createBalloon();
  createConfetti();
  balloonTimeout = setTimeout(startBackgroundEffects, 520);
  confettiTimeout = setTimeout(createConfetti, 180);
}

restartBtn.addEventListener('click', restartStory);

window.addEventListener('load', () => {
  restartStory();
  startBackgroundEffects();
});

window.addEventListener('beforeunload', () => {
  clearInterval(timerInterval);
  clearTimeout(balloonTimeout);
  clearTimeout(confettiTimeout);
});
