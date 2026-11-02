@echo off
title Turing.com Prep Hub Launcher
cd /d "%~dp0"

echo ===================================================
echo     Launching Turing.com Prep Hub
echo ===================================================
echo.

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Python detected. Starting local sync server...
    python server.py
) else (
    echo Python not found in PATH. Opening app directly in default browser...
    start "" "app\index.html"
)
pause

