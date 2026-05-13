// API Base URL
const API_BASE = 'http://localhost:3000/api';

// State management
let greetingState = {
  images: [],
  seenDates: [],
  unseenIndices: [],
  personName: 'Birthday Star'
};

// Birthday Messages
const birthdayMessages = [
  'Five days until your birthday — a gentle reminder of the love you inspire.',
  'Your kindness turns ordinary moments into memories that glow forever.',
  'This day celebrates you: your strength, your warmth, and your beautiful spirit.',
  'A new chapter is approaching, filled with hope, kindness, and quiet joy.',
  'I am grateful for every shared smile, every moment of support, and every kind word.',
  'Your birthday is a quiet promise that the best moments are still ahead.',
  'With all my heart, I wish you beauty, peace, and joy on this special day.',
  'You are deeply cherished.',
];

let messageIndex = 0;
let charIndex = 0;
let timerInterval = null;

// Countdown Target (May 18th of current/next year)
const countdownTarget = (() => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const thisYearTarget = new Date(`${currentYear}-05-18T00:00:00`);
  if (thisYearTarget > now) return thisYearTarget;
  return new Date(`${currentYear + 1}-05-18T00:00:00`);
})();

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const imageInput = document.getElementById('imageInput');
const uploadArea = document.getElementById('uploadArea');
const uploadBtn = document.getElementById('uploadBtn');
const countdownEl = document.getElementById('countdown');
const timerEl = document.getElementById('timer');
const birthdayText = document.getElementById('birthday-text');
const restartBtn = document.getElementById('restart-btn');
const personNameInput = document.getElementById('personName');
const saveNameBtn = document.querySelector('.btn-save-name');
const resetBtn = document.getElementById('resetBtn');
const downloadBtn = document.getElementById('downloadBtn');
const modal = document.getElementById('imageModal');
const closeModal = document.querySelector('.close-modal');
const markSeenBtn = document.getElementById('markSeenBtn');
const deleteBtn = document.getElementById('deleteBtn');
const seenCount = document.getElementById('seenCount');
const unseenCount = document.getElementById('unseenCount');
const totalCount = document.getElementById('totalCount');
const statusList = document.getElementById('statusList');

let selectedImageId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeGallery();
  loadPersonName();
  setupEventListeners();
  setupDragAndDrop();
  loadInitialData();
  startCountdown();
  startTyping();
  launchHearts();
  startBalloons();
  startSparkles();
});

// Setup Event Listeners
function setupEventListeners() {
  uploadBtn.addEventListener('click', () => imageInput.click());
  imageInput.addEventListener('change', handleImageUpload);
  
  saveNameBtn.addEventListener('click', savePersonName);
  personNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') savePersonName();
  });

  resetBtn.addEventListener('click', resetAll);
  downloadBtn.addEventListener('click', downloadMemories);

  closeModal.addEventListener('click', closeImageModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeImageModal();
  });

  markSeenBtn.addEventListener('click', markImageAsSeen);
  deleteBtn.addEventListener('click', deleteImage);
  restartBtn.addEventListener('click', restartTyping);
}

// Drag and Drop
function setupDragAndDrop() {
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      imageInput.files = files;
      handleImageUpload();
    }
  });
}

// Initialize Gallery
function initializeGallery() {
  galleryGrid.innerHTML = '';
  
  for (let i = 0; i < 7; i++) {
    const slot = document.createElement('div');
    slot.className = 'image-slot';
    slot.id = `slot-${i}`;
    slot.innerHTML = `<span class="slot-number">#${i + 1}</span>`;
    slot.addEventListener('click', () => openImageSlot(i));
    
    galleryGrid.appendChild(slot);
  }

  updateGalleryDisplay();
}

// Load Initial Data
async function loadInitialData() {
  try {
    const response = await fetch(`${API_BASE}/greeting`);
    const data = await response.json();
    
    greetingState.images = data.images || [];
    greetingState.seenDates = data.seenDates || [];
    greetingState.unseenIndices = data.unseenIndices || [];
    greetingState.personName = data.personName || 'Birthday Star';
    
    updateGalleryDisplay();
    updateStats();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Handle Image Upload
async function handleImageUpload() {
  const files = imageInput.files;
  
  if (files.length === 0) return;

  if (greetingState.images.length >= 7) {
    alert('Maximum 7 images allowed! Please remove an image first.');
    return;
  }

  const formData = new FormData();
  formData.append('image', files[0]);

  try {
    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      greetingState.images.push({
        id: data.imageId,
        path: data.path
      });
      greetingState.unseenIndices.push(data.imageId);
      
      updateGalleryDisplay();
      updateStats();
      showNotification('Image uploaded successfully! 🎉', 'success');
      imageInput.value = '';
    } else {
      alert('Error uploading image: ' + data.error);
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Error uploading image. Please try again.');
  }
}

// Update Gallery Display
function updateGalleryDisplay() {
  for (let i = 0; i < 7; i++) {
    const slot = document.getElementById(`slot-${i}`);
    const image = greetingState.images[i];

    if (image) {
      slot.innerHTML = `<img src="${image.path}" alt="Memory ${i + 1}">`;
      slot.classList.add('filled');

      // Add status badge
      const badge = document.createElement('div');
      badge.className = 'image-status-badge';
      
      if (greetingState.seenDates[i]) {
        badge.classList.add('seen');
        badge.textContent = '✅';
      } else {
        badge.classList.add('unseen');
        badge.textContent = '🔒';
      }
      
      slot.appendChild(badge);
    } else {
      slot.innerHTML = `<span class="slot-number">#${i + 1}</span>`;
      slot.classList.remove('filled');
    }
  }
}

// Open Image Modal
function openImageSlot(index) {
  if (!greetingState.images[index]) return;

  selectedImageId = index;
  const modalImage = document.getElementById('modalImage');
  modalImage.src = greetingState.images[index].path;

  // Update button states
  if (greetingState.seenDates[index]) {
    markSeenBtn.textContent = 'Already Marked as Seen ✅';
    markSeenBtn.disabled = true;
  } else {
    markSeenBtn.textContent = 'Mark as Seen ✅';
    markSeenBtn.disabled = false;
  }

  modal.style.display = 'block';
}

// Close Image Modal
function closeImageModal() {
  modal.style.display = 'none';
  selectedImageId = null;
}

// Mark Image as Seen
async function markImageAsSeen() {
  if (selectedImageId === null) return;

  try {
    const response = await fetch(`${API_BASE}/mark-seen`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageId: selectedImageId })
    });

    const data = await response.json();

    if (response.ok) {
      greetingState.seenDates = data.seenDates;
      greetingState.unseenIndices = data.unseenIndices;
      
      updateGalleryDisplay();
      updateStats();
      showNotification('Image marked as seen! 🎊', 'success');
      closeImageModal();
    }
  } catch (error) {
    console.error('Error marking image as seen:', error);
  }
}

// Delete Image
async function deleteImage() {
  if (selectedImageId === null) return;

  if (!confirm('Are you sure you want to delete this image?')) return;

  try {
    const response = await fetch(`${API_BASE}/image/${selectedImageId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      greetingState.images.splice(selectedImageId, 1);
      greetingState.seenDates.splice(selectedImageId, 1);
      greetingState.unseenIndices = greetingState.unseenIndices
        .filter(id => id !== selectedImageId)
        .map(id => id > selectedImageId ? id - 1 : id);

      updateGalleryDisplay();
      updateStats();
      showNotification('Image deleted! 🗑️', 'info');
      closeImageModal();
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

// Countdown Functions
function formatTimerValue(value) {
  return String(value).padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const diff = countdownTarget - now;
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownEl.textContent = days;
  timerEl.textContent = `${formatTimerValue(days)}d ${formatTimerValue(hours)}h ${formatTimerValue(minutes)}m ${formatTimerValue(seconds)}s`;
}

function startCountdown() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  updateCountdown();
  timerInterval = setInterval(updateCountdown, 1000);
}

// Typing Functions
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

function startTyping() {
  birthdayText.textContent = '';
  messageIndex = 0;
  charIndex = 0;
  typeBirthdayMessage();
}

function restartTyping() {
  birthdayText.textContent = '';
  messageIndex = 0;
  charIndex = 0;
  typeBirthdayMessage();
}

// Background Effects
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

function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  const size = 5 + Math.random() * 10;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  sparkle.style.left = `${Math.random() * 100}vw`;
  sparkle.style.top = `${110 + Math.random() * 20}vh`;
  sparkle.style.animationDuration = `${6 + Math.random() * 4}s`;
  document.querySelector('.sparkle-container').appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 10000);
}

function startSparkles() {
  createSparkle();
  setTimeout(startSparkles, 420);
}

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

// Update Stats
function updateStats() {
  const seen = greetingState.seenDates.filter(d => d).length;
  const unseen = greetingState.unseenIndices.length;
  const total = greetingState.images.length;

  seenCount.textContent = seen;
  unseenCount.textContent = unseen;
  totalCount.textContent = total;

  // Update status list
  statusList.innerHTML = '';
  greetingState.images.forEach((img, index) => {
    const item = document.createElement('li');
    item.className = 'status-item';
    
    const isSeen = greetingState.seenDates[index];
    if (isSeen) {
      item.classList.add('seen');
      const seeDate = new Date(isSeen).toLocaleString();
      item.innerHTML = `
        <span class="status-text">Photo #${index + 1}</span>
        <span>✅ Seen on ${seeDate}</span>
      `;
    } else {
      item.classList.add('unseen');
      item.innerHTML = `
        <span class="status-text">Photo #${index + 1}</span>
        <span>🔒 Not seen yet</span>
      `;
    }
    
    statusList.appendChild(item);
  });
}

// Save Person Name
async function savePersonName() {
  const name = personNameInput.value.trim() || 'Birthday Star';
  
  try {
    const response = await fetch(`${API_BASE}/set-name`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    const data = await response.json();
    greetingState.personName = data.name;
    showNotification(`Hello ${data.name}! 🎉`, 'success');
  } catch (error) {
    console.error('Error saving name:', error);
  }
}

// Load Person Name
async function loadPersonName() {
  try {
    const response = await fetch(`${API_BASE}/get-name`);
    const data = await response.json();
    greetingState.personName = data.name;
    personNameInput.value = data.name;
  } catch (error) {
    console.error('Error loading name:', error);
  }
}

// Reset All
function resetAll() {
  if (!confirm('Are you sure you want to reset everything? This cannot be undone!')) return;

  location.reload();
}

// Download Memories
function downloadMemories() {
  const now = new Date();
  const timestamp = now.toLocaleString();

  const report = {
    personName: greetingState.personName,
    timestamp,
    totalImages: greetingState.images.length,
    seenImages: greetingState.seenDates.filter(d => d).length,
    unseenImages: greetingState.unseenIndices.length,
    imageDetails: greetingState.images.map((img, index) => ({
      photoNumber: index + 1,
      uploadedAt: img.uploadedAt,
      seenOn: greetingState.seenDates[index] || 'Not viewed',
      status: greetingState.seenDates[index] ? 'Seen ✅' : 'Unseen 🔒'
    }))
  };

  const dataStr = JSON.stringify(report, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `birthday-memories-${now.getTime()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showNotification('Memories downloaded! 📥', 'success');
}

// Notification Helper
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#2ed573' : type === 'error' ? '#ff4757' : '#667eea'};
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideInDown 0.3s ease-out;
    font-weight: 600;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Auto-refresh timer every second
setInterval(() => {
  if (greetingState.timerActive) {
    updateTimerDisplay();
  }
}, 1000);
