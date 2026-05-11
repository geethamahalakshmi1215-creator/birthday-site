const birthdayText = document.getElementById('birthday-text');
const restartBtn = document.getElementById('restart-btn');
const countdownEl = document.getElementById('countdown');

const birthdayMessages = [
  'Just 7 days until the birthday sparkle begins!',
  'Get ready for cake, laughter, and unforgettable joy.',
  'Each day brings more excitement as the celebration grows near.',
  'Wishing you a week full of smiles and fun surprises.',
  'One week to make a wish and share the happiness.',
  'Happy early birthday! Your special day is almost here. 🎂',
  'Count down the days with cheerful hearts and bright dreams. ✨',
  'Akka Garu',
];

let messageIndex = 0;
let charIndex = 0;
let countdownValue = 7;

function updateCountdown() {
  countdownEl.textContent = countdownValue;
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
  countdownValue = 7;
  updateCountdown();
  typeBirthdayMessage();
}

restartBtn.addEventListener('click', () => {
  birthdayText.textContent = '';
  messageIndex = 0;
  charIndex = 0;
  countdownValue = 7;
  updateCountdown();
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
