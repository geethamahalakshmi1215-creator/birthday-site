const birthdayText = document.getElementById('birthday-text');
const restartBtn = document.getElementById('restart-btn');
const countdownEl = document.getElementById('countdown');
const timerEl = document.getElementById('timer');
const balloonContainer = document.querySelector('.balloon-container');
const confettiContainer = document.querySelector('.confetti-container');

const birthdayMessages = [
  'Just five more days until your birthday… 🎂✨ and honestly, some people deserve more than just wishes — they deserve to be reminded how deeply precious they are 🤍',

'You are the kind of person whose presence becomes comfort without effort 🌸 A single conversation with you can calm a heavy heart 💫 A single smile from you can make an ordinary day feel meaningful 🌷 That softness in you is truly rare 💖',

'In a world where many people pretend, your heart remains genuine 🕊️ You care quietly, love sincerely, and stand by people even when you expect nothing in return 🌹 That kind of soul is impossible to replace ✨',

'I hope this birthday reminds you that you are not invisible, not ordinary, and never unimportant 🌼 The love you give matters 💕 The sacrifices you make matter 🌙 You matter more than words can ever explain 🤍',

'May this next chapter of your life bring you peaceful mornings ☀️ genuine laughter 😊 people who truly value your heart 💞 and moments that heal every hidden sadness you never speak about 🌈',

'You deserve happiness that stays 🌸 love that feels safe 🫶 and dreams that finally come true without pain following behind them ⭐',

'Akka Garu, the world became softer and more beautiful the day you were born 💐✨🤍',
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
  const size = 18 + Math.random() * 16;

  balloon.className = 'balloon';
  balloon.style.width = `${size}px`;
  balloon.style.height = `${size * 1.35}px`;
  balloon.style.left = `${Math.random() * 92}vw`;
  balloon.style.animationDuration = `${9 + Math.random() * 4}s`;
  balloon.style.background = `linear-gradient(180deg, rgba(255,255,255,0.95), rgba(${210 + Math.random() * 35}, ${95 + Math.random() * 120}, ${185 + Math.random() * 45}, 1))`;
  balloonContainer.appendChild(balloon);

  setTimeout(() => balloon.remove(), 9000);
}

function createConfetti() {
  const piece = document.createElement('span');
  const colors = ['#ffd166', '#ef476f', '#7df9ff', '#f8b4ff', '#caff8a'];

  piece.className = 'confetti-piece';
  piece.style.left = `${Math.random() * 100}vw`;
  piece.style.background = colors[Math.floor(Math.random() * colors.length)];
  piece.style.animationDuration = `${5 + Math.random() * 3}s`;
  piece.style.animationDelay = `${Math.random() * 0.7}s`;
  piece.style.transform = `rotate(${Math.random() * 180}deg)`;
  confettiContainer.appendChild(piece);

  setTimeout(() => piece.remove(), 7000);
}

function startBackgroundEffects() {
  createBalloon();
  createConfetti();
  balloonTimeout = setTimeout(startBackgroundEffects, 1800);
  confettiTimeout = setTimeout(createConfetti, 650);
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
