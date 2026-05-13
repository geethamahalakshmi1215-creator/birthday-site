# Birthday Greeting Website - Copilot Instructions

This is a full-stack birthday greeting website with Node.js/Express backend and vanilla HTML/CSS/JS frontend.

## Project Overview

A beautiful, emotionally-touching web application that allows users to:
- Add up to 7 special photos for a birthday person
- Use a 7-minute timer for reflection
- Track which photos have been seen/unseen
- Personalize with the birthday person's name
- Download memory reports

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js with Express.js
- **File Upload**: Multer middleware
- **Cross-Origin**: CORS enabled

## Project Structure

```
BirthdayGreeting/
├── public/
│   ├── index.html       - Main HTML page
│   ├── styles.css       - Beautiful responsive styling
│   └── script.js        - Frontend logic
├── src/
│   └── server.js        - Express backend server
├── uploads/             - Image storage
├── package.json         - Dependencies
├── README.md            - Documentation
├── setup.bat            - Windows setup script
└── .gitignore           - Git configuration
```

## Setup Instructions

1. **Install Node.js** from https://nodejs.org/ (LTS version recommended)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Open in browser**: http://localhost:3000

## Key Features Implemented

### Frontend Features
- Drag-and-drop image upload
- Real-time timer display
- Image gallery with status badges
- Seen/unseen tracking UI
- Responsive design (mobile-first)
- Beautiful gradient backgrounds
- Smooth animations
- Modal for image preview and actions

### Backend Features
- RESTful API endpoints
- Multer file upload handling
- In-memory data storage
- Timer management
- Image deletion
- Person name persistence

### Beautiful Design Elements
- Purple-pink gradient themes
- Smooth animations and transitions
- Responsive grid layout
- Heart-touching typography
- Hover effects and interactions
- Proper spacing and typography

## Development Notes

- CORS is enabled for development - modify in production
- Images are stored in `/uploads` folder
- Data persists only during server session (in-memory)
- Timer is 7 minutes as specified
- Supports up to 7 images

## For Future Enhancements

- Add database for persistent storage
- Add user authentication
- Add email notifications
- Add music/sound effects
- Add sharing features
- Add more animation effects
