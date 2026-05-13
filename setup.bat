@echo off
REM Birthday Greeting Setup Script for Windows

echo.
echo ========================================
echo   Birthday Greeting Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js found!
node --version

echo.
echo Installing dependencies...
call npm install

if errorlevel 1 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ Setup Complete!
echo ========================================
echo.
echo To start the server, run:
echo   npm start
echo.
echo Then open your browser to:
echo   http://localhost:3000
echo.
echo ========================================
pause
