@echo off
title Launching Fashion Store

echo Starting Backend Server...
start "Backend Server (Port 5000)" cmd /k "cd /d C:\Users\hp\Desktop\Fashion store\fashion-backend && npx nodemon server.js"

echo Starting Frontend Server...
start "Frontend Server (Port 5173)" cmd /k "cd /d C:\Users\hp\Desktop\Fashion store\fashion-frontend && npm run dev"

echo Opening Store in Browser...
timeout /t 3 >nul
start http://localhost:5173

exit