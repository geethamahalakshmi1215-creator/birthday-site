# 🚀 SETUP INSTRUCTIONS - Birthday Greeting Website

## ⚠️ Prerequisites Required

### Step 1: Install Node.js

Node.js is NOT currently installed on your system. You must install it first.

1. **Download Node.js LTS (v20.x recommended)**:
   - Go to: https://nodejs.org/
   - Click the green "LTS" button
   - Download the Windows Installer (.msi)

2. **Run the Installer**:
   - Open the downloaded `.msi` file
   - Click "Next" through all prompts
   - **Ensure these options are checked**:
     ✅ Node.js runtime
     ✅ npm package manager
     ✅ Add to PATH (this is important!)
   - Click "Install"
   - Wait for installation to complete

3. **Verify Installation**:
   - Close any open terminals/PowerShell windows
   - Open a **NEW** PowerShell window
   - Run these commands:
     ```powershell
     node --version
     npm --version
     ```
   - You should see version numbers like `v20.x.x` and `10.x.x`

## 📋 After Node.js Installation

Once Node.js is installed, return to this folder and follow these steps:

### Step 2: Install Dependencies

In the PowerShell window, run:
```powershell
npm install
```

This will install:
- Express (web server framework)
- Multer (file upload handling)
- CORS (cross-origin requests)

### Step 3: Start the Server

```powershell
npm start
```

You should see:
```
Birthday Greeting Server running at http://localhost:3000
```

### Step 4: Open in Browser

- Open your web browser
- Go to: **http://localhost:3000**
- The beautiful birthday greeting website is ready! 🎉

## ❓ Troubleshooting

### "npm: The term 'npm' is not recognized"
**Solution**: 
- Close your PowerShell window completely
- Open a **NEW** PowerShell window
- This reloads the PATH environment variable

### "Port 3000 already in use"
**Solution**:
- Edit `src/server.js`
- Change `const PORT = 3000` to `const PORT = 3001` (or another number)
- Restart the server

### Windows Firewall Popup
**Action**: Click "Allow" to permit Node.js access to the network

## 🎯 Next Steps After Setup

1. ✅ Add personalized photos (up to 7)
2. ✅ Set the birthday person's name
3. ✅ Start the 7-minute timer
4. ✅ Share with the birthday person
5. ✅ Download memories when done

---

**📞 Support**: If you encounter issues, make sure:
- Node.js is properly installed and in PATH
- No other application is using port 3000
- You're using a modern browser (Chrome, Firefox, Edge, Safari)

**Good luck, and happy birthday! 🎂💖**
