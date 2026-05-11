const typedText = document.getElementById('typed-text');
const replayBtn = document.getElementById('replay-btn');

const messageLines = [
  'Together you built a story full of laughter and beautiful moments.',
  'May every year bring more joy, tenderness, and sparkling memories.',
  'Happy anniversary — your love shines brighter than the stars! ✨❤️',
];

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (lineIndex >= messageLines.length) {
    typedText.innerHTML += ' <span class="final-emoji">🌹</span>';
    return;
  }

  const line = messageLines[lineIndex];
  if (charIndex < line.length) {
    typedText.textContent += line.charAt(charIndex);
    charIndex += 1;
    setTimeout(typeLine, 60);
  } else {
    typedText.textContent += '\n\n';
    lineIndex += 1;
    charIndex = 0;
    setTimeout(typeLine, 550);
  }
}

function startTyping() {
  typedText.textContent = '';
  lineIndex = 0;
  charIndex = 0;
  typeLine();
}

replayBtn.addEventListener('click', () => {
  startTyping();
});

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  const size = 18 + Math.random() * 24;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${5 + Math.random() * 3}s`;
  heart.style.opacity = String(0.6 + Math.random() * 0.4);
  document.querySelector('.heart-container').appendChild(heart);

  setTimeout(() => heart.remove(), 9000);
}

function launchHearts() {
  createHeart();
  setTimeout(launchHearts, 500);
}

window.addEventListener('load', () => {
  startTyping();
  launchHearts();
});
