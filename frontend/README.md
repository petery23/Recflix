# Recflix — Frontend

This README explains how to run the Recflix frontend and how it interacts with the local backend in this repository.

Prerequisites
- Node.js (16+ recommended) and npm or yarn
- Python 3.8+ (used by backend Python scripts)
- pip (for installing Python packages)
- expo-cli (if you want to run the mobile/web frontend with Expo)

Ports
- Backend Node server: http://localhost:3001
- Frontend (Expo): usually http://localhost:19006 (web) or the Expo client on device/emulator

Quick start

1) Backend - Node

```bash
cd backend/node
npm install
npm start
```

2) Backend - Python (data prep)

```bash
python3 -m pip install pandas pyarrow
cd backend/python
python3 pre_merge_data.py 
```

3) Frontend

```bash
cd frontend
npm install
npm start
```
