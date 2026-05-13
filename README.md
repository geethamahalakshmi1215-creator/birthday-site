<<<<<<< HEAD
# 🎂 Birthday Greeting Website

A beautiful, emotionally-touching full-stack birthday greeting website with image gallery, 7-minute timer, and seen/unseen tracking.

## 🌟 Features

✨ **7-Image Gallery** - Add up to 7 special photos for the birthday person
⏱️ **7-Minute Timer** - A magical countdown timer (7 minutes)
👁️ **Seen/Unseen Tracking** - Track which images have been viewed
💾 **Persistent Storage** - Backend handles all data and image uploads
📱 **Responsive Design** - Beautiful on desktop, tablet, and mobile
💖 **Emotional Design** - Heart-touching UI with gradients and animations

## 📋 Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## 🚀 Quick Start

### 1. Install Node.js
If you don't have Node.js installed:
- Visit https://nodejs.org/
- Download the LTS version
- Run the installer and follow the instructions

### 2. Install Dependencies
Open terminal/PowerShell in the project folder and run:
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```

You should see: `Birthday Greeting Server running at http://localhost:3000`

### 4. Open in Browser
Go to: http://localhost:3000

## 🎮 How to Use

### Adding Pictures
1. Click "Choose Image" or drag & drop images into the upload area
2. Add up to 7 photos
3. Each photo gets a status badge (seen/unseen)

### Setting the Birthday Person's Name
1. Enter the person's name in the input field at the top
2. Click "Save Name"
3. The greeting will personalize for them

### Using the Timer
1. Click "Start 7-Minute Timer"
2. Watch the 7-minute countdown
3. Perfect for a special moment of reflection

### Tracking Images
- **Seen Images** ✅ - Click on an image and mark it as seen
- **Unseen Images** 🔒 - Images not yet viewed
- See the status in the tracking section

### Download Memories
- Click "Download Memories" to export a JSON file with all photo details

## 📁 Project Structure

```
BirthdayGreeting/
├── public/
│   ├── index.html       # Main HTML file
│   ├── styles.css       # Beautiful styling
│   └── script.js        # Frontend JavaScript
├── src/
│   └── server.js        # Express backend server
├── uploads/             # Stores uploaded images
├── package.json         # Project dependencies
└── README.md            # This file
```

## 🛠️ API Endpoints

### GET /api/greeting
Get all greeting data

### POST /api/upload
Upload an image file

### POST /api/mark-seen
Mark an image as seen

### POST /api/start-timer
Start the 7-minute timer

### GET /api/timer-status
Get current timer status

### POST /api/set-name
Set the birthday person's name

### GET /api/get-name
Get the birthday person's name

### DELETE /api/image/:id
Delete an image

## 🎨 Beautiful Touches

- **Gradient Backgrounds** - Purple-pink themes
- **Smooth Animations** - Slide-ins, fade-outs, pulse effects
- **Responsive Grid** - Adapts to any screen size
- **Hover Effects** - Interactive and engaging
- **Emotional Typography** - Heart-touching messages

## 🔧 Troubleshooting

### Port 3000 already in use
Change the port in `src/server.js` (line: `const PORT = 3000`)

### Images not uploading
Make sure the `uploads/` folder exists (it should be auto-created)

### Timer not starting
Check browser console for errors, make sure backend is running

## 📝 Customization

### Change Colors
Edit the CSS variables in `public/styles.css`:
```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

### Change Timer Duration
In `src/server.js`, line 65:
```javascript
const timerDuration = 7 * 60 * 1000; // Change 7 to desired minutes
```

## 💝 Perfect For

- Birthday celebrations
- Anniversary gifts
- Special occasions
- Memorial moments
- Personalized surprises

---

**Made with 💖** - Every moment with you is special!
