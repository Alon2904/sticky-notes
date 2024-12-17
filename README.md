# Notes App

A Next.js application for creating and managing sticky notes with Firebase authentication and real-time database.

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- Firebase CLI (`npm install -g firebase-tools`)

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication:
   - Go to Authentication → Sign-in method
   - Enable Google provider
   - Add your authorized domains
3. Enable Firestore Database:
   - Go to Firestore Database
   - Create database
   - Start in production mode
4. Initialize Firebase in your project:
   ```bash
   # Install Firebase CLI globally if you haven't
   npm install -g firebase-tools

   # Login to Firebase
   firebase login

   # Initialize Firebase in your project
   firebase init

   # Select:
   # - Firestore
   # - Authentication
   # Choose your project
   ```
5. Deploy Firestore rules:
   ```bash
   npm run deploy:rules
   ```
   This will deploy the security rules defined in `firestore.rules`

## Local Setup

1. Clone the repository:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


