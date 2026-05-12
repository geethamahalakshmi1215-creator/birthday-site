const birthdayText = document.getElementById('birthday-text');
const restartBtn = document.getElementById('restart-btn');
const countdownEl = document.getElementById('countdown');

const birthdayMessages = [
  'Six days until your birthday — a gentle reminder of the love you inspire.',
  'Your kindness turns ordinary moments into memories that glow forever.',
  'This day celebrates you: your strength, your warmth, and your beautiful spirit.',
  'A new chapter is approaching, filled with hope, kindness, and quiet joy.',
  'I am grateful for every shared smile, every moment of support, and every kind word.',
  'Your birthday is a quiet promise that the best moments are still ahead.',
  'With all my heart, I wish you beauty, peace, and joy on this special day.',
  'Akka Garu, you are deeply cherished.',
];

let messageIndex = 0;
let charIndex = 0;
let timerInterval = null;
const countdownTarget = (() => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const thisYearTarget = new Date(`${currentYear}-05-18T00:00:00`);
  if (thisYearTarget > now) return thisYearTarget;
  return new Date(`${currentYear + 1}-05-18T00:00:00`);
})();

function formatTimerValue(value) {
  return String(value).padStart(2, '0');
}

function updateCountdown() {
  countdownEl.textContent = countdownValue;
}

function updateTimer() {
  const now = new Date();
  const diff = countdownTarget - now;
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownEl.textContent = days;
  document.getElementById('timer').textContent = `${formatTimerValue(days)}d ${formatTimerValue(hours)}h ${formatTimerValue(minutes)}m ${formatTimerValue(seconds)}s`;
}

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function typeBirthdayMessage() {
  if (messageIndex >= birthdayMessages.length) {
    birthdayText.innerHTML += '\n\n<span class="final-emoji">🎊</span>';
    return;
  }

  const currentMessage = birthdayMessages[messageIndex];
  if (charIndex < currentMessage.length) {
    birthdayText.textContent += currentMessage.charAt(charIndex);
    charIndex += 1;
    setTimeout(typeBirthdayMessage, 55);
  } else {
    birthdayText.textContent += '\n\n';
    messageIndex += 1;
    charIndex = 0;
    setTimeout(typeBirthdayMessage, 500);
  }
}

function startStory() {
  birthdayText.textContent = '';
  messageIndex = 0;
  charIndex = 0;
  startTimer();
  typeBirthdayMessage();
}

restartBtn.addEventListener('click', () => {
  birthdayText.textContent = '';
  messageIndex = 0;
  charIndex = 0;
  startTimer();
  typeBirthdayMessage();
});

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  const size = 24 + Math.random() * 24;
  balloon.style.width = `${size}px`;
  balloon.style.height = `${size * 1.35}px`;
  balloon.style.left = `${Math.random() * 90}vw`;
  balloon.style.background = `linear-gradient(180deg, rgba(255,255,255,0.95), rgba(${200 + Math.random()*55}, ${90 + Math.random()*120}, ${180 + Math.random()*55}, 1))`;
  balloon.style.animationDuration = `${6 + Math.random() * 4}s`;
  document.querySelector('.balloon-container').appendChild(balloon);

  setTimeout(() => balloon.remove(), 11000);
}

function startBalloons() {
  createBalloon();
  setTimeout(startBalloons, 650);
}

window.addEventListener('load', () => {
  startStory();
  startBalloons();
});
