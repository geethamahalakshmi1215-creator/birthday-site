@echo off
color 0F
cls

echo.
echo ======================================================
echo   🎂 BIRTHDAY GREETING - SETUP WIZARD 🎂
echo ======================================================
echo.

REM Check for Node.js
echo [1/3] Checking for Node.js installation...
where node >nul 2>nul

if errorlevel 1 (
    echo.
    echo ❌ ERROR: Node.js is NOT installed!
    echo.
    echo Please install Node.js by visiting: https://nodejs.org/
    echo.
    echo Installation Instructions:
    echo   1. Download the LTS version
    echo   2. Run the installer
    echo   3. Make sure "Add to PATH" is checked
    echo   4. Restart this script after installation
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found!
node --version
echo.

REM Install dependencies
echo [2/3] Installing npm dependencies...
echo This may take a few minutes...
echo.
call npm install

if errorlevel 1 (
    echo.
    echo ❌ ERROR: Failed to install dependencies!
    echo.
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully!
echo.

REM Final instructions
echo [3/3] Setup complete!
echo.
echo ======================================================
echo ✨ SETUP SUCCESSFUL! ✨
echo ======================================================
echo.
echo To start the server, run:
echo   npm start
echo.
echo Then open your browser to:
echo   http://localhost:3000
echo.
echo Features:
echo   📸 Upload up to 7 photos
echo   ⏱️  7-minute timer
echo   👁️  Track seen/unseen images
echo   💝 Personalize with a name
echo.
echo ======================================================
echo.
pause
