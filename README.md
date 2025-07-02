 Real-Time Chat Application
![Screenshot 2025-01-26 232927](https://github.com/user-attachments/assets/0391e0af-5064-46fb-be7e-acf3f23de6cc)
![Screenshot 2025-02-09 134154](https://github.com/user-attachments/assets/73791b5f-2200-4fbb-85e8-52e9084dfdc8)

 Overview
Real-Time Chat Application is a web-based chat platform that enables users to send and receive messages instantly. Built with React, Vite, and Firebase, the app provides seamless user authentication and real-time message updates.

 Features
- Instant Messaging: Real-time chat powered by Firebase.
- User Authentication: Secure login and authentication system.
- Live Updates: Messages appear instantly without requiring page refresh.
- Fast Performance: Optimized with Vite for quick loading.

 Tech Stack
- Frontend: React, Vite
- Backend: Firebase Firestore
- Authentication: Firebase Authentication

 Live Demo
[Click here to access the live chat app](https://vaishnaviimishra.github.io/chat)

 Installation
 Prerequisites
- Node.js installed
- Firebase project set up

 Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/VaishnaviiMishra/chat.git
   cd chat
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase configuration in a `.env.local` file:
   ```plaintext
     apiKey: "AIzaSyBz8fHbmUM_qAwEZz51F8AsiFozIVqpv6c",
    authDomain: "chatapp-78aae.firebaseapp.com",
    projectId: "chatapp-78aae",
    storageBucket: "chatapp-78aae.appspot.com",
    messagingSenderId: "1091750643681",
    appId: "1:1091750643681:web:57f4e8dc4b1e3dbef034a0",
    measurementId: "G-PSK3L2JLGC",

   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

 Deployment
The app is deployed on GitHub Pages. To deploy updates:
```bash
npm run build
npm run deploy
```

 Contribution
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

 License
This project is licensed under the MIT License.

 Contact
For any queries, reach out to [Vaishnavii Mishra](https://github.com/VaishnaviiMishra).

