# 🎉 BIRTHDAY GREETING WEBSITE - QUICK START GUIDE

## 📦 What You Have

A complete, full-stack birthday greeting website ready to make someone's birthday special!

**Location**: `C:\Users\B.GEETHA MAHALAKSHMI\Desktop\BirthdayGreeting`

## ⚡ QUICK START (3 Steps)

### Step 1: Install Node.js (ONE TIME ONLY)
If you haven't already:
1. Visit https://nodejs.org/
2. Download and install the LTS version
3. **Important**: Check "Add to PATH" during installation
4. Restart any open terminals

### Step 2: Double-Click Setup Script
In the BirthdayGreeting folder, double-click:
- **`setup-windows.bat`**

This will automatically install all dependencies.

### Step 3: Start the Server
In PowerShell or Command Prompt:
```bash
npm start
```

Then open: **http://localhost:3000** 🎂

---

## 🎨 Features

### 📸 Photo Gallery
- Add up to 7 special photos for the birthday person
- Beautiful grid layout that adapts to any screen
- Drag-and-drop upload or click to select

### ⏱️ 7-Minute Timer
- Start a magical 7-minute countdown
- Perfect for a moment of reflection
- Beautiful timer display with animations

### 👁️ Tracking System
- **Seen**: Images the birthday person has viewed ✅
- **Unseen**: Images waiting to be discovered 🔒
- Real-time status updates and statistics

### 💝 Personalization
- Save the birthday person's name
- The website addresses them personally
- All data shown with their name

### 📊 Dashboard
- View total photos: 7
- See how many photos have been viewed
- Track remaining unseen photos
- Download a JSON report of all memories

### 💖 Beautiful Design
- Purple and pink gradient backgrounds
- Smooth animations and transitions
- Fully responsive (works on phone, tablet, desktop)
- Heart-touching emotional design

---

## 📁 Project Files

```
BirthdayGreeting/
├── public/
│   ├── index.html           Frontend page
│   ├── styles.css           Beautiful styling
│   └── script.js            Interactive features
├── src/
│   └── server.js            Backend server
├── uploads/                 Stores photos
├── .vscode/
│   ├── tasks.json           VS Code tasks
│   └── settings.json        Editor settings
├── package.json             Dependencies
├── README.md                Full documentation
├── SETUP_INSTRUCTIONS.md    Detailed setup
├── setup-windows.bat        Automatic setup
└── setup.bat                Alternative setup
```

---

## 🎮 How to Use

### For the Creator (You)
1. Open http://localhost:3000
2. Enter the birthday person's name
3. Upload 7 special photos
4. Share the link with the birthday person

### For the Birthday Person
1. Open the link you share
2. See their personalized greeting
3. Click through the 7 photos
4. Start the 7-minute timer
5. Download memories at the end

---

## 🔧 Customization

### Change Colors
Edit `public/styles.css` and modify these variables:
```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

### Change Timer Duration
In `src/server.js`, find this line and change `7` to your desired minutes:
```javascript
const timerDuration = 7 * 60 * 1000;
```

### Change Port
If port 3000 is already in use, edit `src/server.js`:
```javascript
const PORT = 3000; // Change to 3001, 3002, etc.
```

---

## ⌨️ Command Reference

```bash
# Install dependencies (first time only)
npm install

# Start the server
npm start

# Start with auto-reload (if nodemon is installed)
npm run dev
```

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| "npm not recognized" | Close and reopen PowerShell after Node.js install |
| Port 3000 in use | Change PORT in `src/server.js` |
| Images not uploading | Ensure `uploads/` folder exists |
| Timer not starting | Check browser console for errors |
| Photos not saving | Server must be running |

---

## 💡 Pro Tips

1. **Take Beautiful Photos**: 7 quality images make a huge impact
2. **Include Memories**: Mix old and recent photos
3. **Add a Personal Touch**: Customize the colors to their favorite theme
4. **Timing**: Start with a message, then let them explore
5. **Share Link**: Send them the localhost URL or deploy online

---

## 🌐 Going Online (Optional)

To share outside your network, deploy to:
- **Heroku** (free tier)
- **Vercel** (frontend only)
- **Railway** (easy deployment)
- **Render** (good free tier)
- **Your own server**

See README.md for deployment guides.

---

## 💖 Made with Love

This website is designed to touch hearts and create memorable moments. Every detail from colors to animations was chosen to evoke emotion.

**Enjoy creating beautiful birthday memories!** 🎂✨

---

**Questions?** Check README.md or SETUP_INSTRUCTIONS.md for more help.
