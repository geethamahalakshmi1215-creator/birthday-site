const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// In-memory storage for greeting data
const greetingData = {
  images: [],
  seenDates: [],
  unseenIndices: [],
  timerActive: false,
  timerEndTime: null,
  personName: 'Birthday Star'
};

// Routes

// Get greeting data
app.get('/api/greeting', (req, res) => {
  res.json(greetingData);
});

// Upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const index = greetingData.images.length;
  if (index >= 7) {
    return res.status(400).json({ error: 'Maximum 7 images allowed' });
  }

  greetingData.images.push({
    id: index,
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    uploadedAt: new Date()
  });

  greetingData.unseenIndices.push(index);

  res.json({
    success: true,
    imageId: index,
    path: `/uploads/${req.file.filename}`
  });
});

// Mark image as seen
app.post('/api/mark-seen', (req, res) => {
  const { imageId } = req.body;

  if (imageId < 0 || imageId >= greetingData.images.length) {
    return res.status(400).json({ error: 'Invalid image ID' });
  }

  // Remove from unseen list
  greetingData.unseenIndices = greetingData.unseenIndices.filter(id => id !== imageId);
  
  // Add to seen dates
  greetingData.seenDates[imageId] = new Date();

  res.json({
    success: true,
    message: 'Image marked as seen',
    seenDates: greetingData.seenDates,
    unseenIndices: greetingData.unseenIndices
  });
});

// Start 7-minute timer
app.post('/api/start-timer', (req, res) => {
  const timerDuration = 7 * 60 * 1000; // 7 minutes in milliseconds
  greetingData.timerActive = true;
  greetingData.timerEndTime = new Date(Date.now() + timerDuration);

  res.json({
    success: true,
    timerEndTime: greetingData.timerEndTime,
    durationMs: timerDuration
  });
});

// Get timer status
app.get('/api/timer-status', (req, res) => {
  let remainingTime = 0;

  if (greetingData.timerActive && greetingData.timerEndTime) {
    remainingTime = greetingData.timerEndTime - Date.now();

    if (remainingTime <= 0) {
      greetingData.timerActive = false;
      remainingTime = 0;
    }
  }

  res.json({
    isActive: greetingData.timerActive,
    remainingTime,
    timerEndTime: greetingData.timerEndTime
  });
});

// Set person name
app.post('/api/set-name', (req, res) => {
  const { name } = req.body;
  greetingData.personName = name || 'Birthday Star';
  res.json({ success: true, name: greetingData.personName });
});

// Get person name
app.get('/api/get-name', (req, res) => {
  res.json({ name: greetingData.personName });
});

// Delete image
app.delete('/api/image/:id', (req, res) => {
  const { id } = req.params;
  const imageId = parseInt(id);

  if (imageId < 0 || imageId >= greetingData.images.length) {
    return res.status(400).json({ error: 'Invalid image ID' });
  }

  const image = greetingData.images[imageId];
  const filePath = path.join('uploads', image.filename);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error('Error deleting file:', err);
  }

  greetingData.images.splice(imageId, 1);
  greetingData.seenDates.splice(imageId, 1);
  greetingData.unseenIndices = greetingData.unseenIndices
    .filter(idx => idx !== imageId)
    .map(idx => idx > imageId ? idx - 1 : idx);

  res.json({ success: true, message: 'Image deleted' });
});

app.listen(PORT, () => {
  console.log(`Birthday Greeting Server running at http://localhost:${PORT}`);
});
