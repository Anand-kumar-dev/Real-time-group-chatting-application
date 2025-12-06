# Real-Time Group Chatting Application

A modern, real-time group chat application built with **React**, **Node.js**, and **Socket.IO**. This application enables multiple users to join a group chat and communicate instantly with a clean, intuitive user interface.

---

## Project Screenshots & Videos

### Screenshots
<img width="1366" height="642" alt="Screenshot 2025-12-05 134949" src="https://github.com/user-attachments/assets/1cd69f26-4c73-40ec-a595-a45b63e3ae84" />

<img width="1361" height="630" alt="Screenshot 2025-12-05 145622" src="https://github.com/user-attachments/assets/91af4f76-3d42-46e7-8042-4ab904d2a05b" />

<img width="1366" height="640" alt="Screenshot 2025-12-05 135740" src="https://github.com/user-attachments/assets/538f88f0-85a6-452f-82f9-f296a9ce06dc" />



```
[Screenshot 1 - Login Screen]
[Screenshot 2 - Chat Interface]
[Screenshot 3 - Group Chat in Action]
```
---

## Features

- **Real-Time Messaging**: Instant message delivery using WebSocket technology
- **User Management**: Join the chat with a username and see active members
- **Connection Notifications**: Get notified when users join or leave the chat
- **Responsive UI**: Beautiful dark-themed interface with Tailwind CSS
- **Member List**: View all currently connected users in a dropdown
- **Message History**: See all messages from current session
- **User Identification**: Messages are tagged with the sender's name

---

## Project Architecture

### System Overview
```
┌─────────────────────────────────────────────┐
│        Real-Time Chat Application           │
├──────────────┬──────────────────────────────┤
│   Frontend   │        Backend               │
│  (React)     │    (Hono + Socket.IO)        │
└──────────────┴──────────────────────────────┘
```

### Technology Stack

#### **Frontend**
- **React 19**: UI framework
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Styling framework
- **Socket.IO Client**: Real-time WebSocket communication
- **ESLint**: Code quality

#### **Backend**
- **Node.js**: Runtime environment
- **Hono**: Lightweight web framework
- **Socket.IO**: WebSocket communication library
- **TypeScript**: Type safety (dev dependency)

---

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   └── index.js          # Server entry point & Socket.IO logic
│   ├── package.json          # Backend dependencies
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main chat component
│   │   ├── main.jsx          # React entry point
│   │   ├── socket.js         # Socket.IO client configuration
│   │   ├── index.css         # Global styles
│   │   └── components/
│   │       └── Message.jsx   # Individual message component
│   ├── package.json          # Frontend dependencies
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── vite.config.js        # Vite configuration
│   └── README.md
│
└── readme.md                 # This file
```

---

## Code Flow & Architecture

### 1. **Frontend Flow**

#### App.jsx (Main Component)
- **Username Input Screen**: User enters their name
- **Submit Handler**: Sends `onconnect` event to backend with username
- **Chat Screen**: Displays after successful connection

**Key State Management:**
```javascript
- username: Stores the user's name
- submitted: Tracks if user has joined the chat
- messages: Array of all chat messages
- usermess: Current message being typed
- member: List of all connected users
- someconnect: Notification when user joins
- somedisconnect: Notification when user leaves
```

#### Socket Events (Frontend → Backend)
| Event | Payload | Purpose |
|-------|---------|---------|
| `onconnect` | `{ name: username }` | User joins the chat |
| `message` | `{ name, mess, sender }` | Send a message to others |

#### Socket Events (Backend → Frontend)
| Event | Payload | Purpose |
|-------|---------|---------|
| `connect` | - | Connection established |
| `members` | `[usernames]` | Updated member list |
| `message` | `{ name, mess }` | Receive message from other user |
| `onconnect` | `{ name }` | Another user joined |
| `userLeft` | `{ name }` | Another user disconnected |

#### Message Component
- Displays individual messages
- Differentiates between own messages (blue, right-aligned) and others (gray, left-aligned)
- Shows sender's name below message

#### Socket Configuration (socket.js)
- Connects to backend server at `http://localhost:3000`
- Exported as singleton for use throughout the app

---

### 2. **Backend Flow**

#### index.js (Server)
**Server Setup:**
- Runs on **Port 3000**
- Uses Hono for HTTP routes
- Initializes Socket.IO with CORS enabled for all origins
- Maintains `users` array to track connected members

**Socket Event Handlers:**

**`onconnect` Event**
```
┌─ Client sends username
│
├─ Store socket.username
├─ Add user to users array
├─ Broadcast to ALL clients: updated members list
└─ Notify others: new user joined
```

**`message` Event**
```
┌─ Client sends { name, mess, sender }
│
├─ Log message to console
└─ Broadcast to OTHERS: message data
```

**`disconnect` Event**
```
┌─ User disconnects/closes browser
│
├─ Remove user from users array
├─ Broadcast to ALL: updated members list
└─ Notify others: user left
```

---

## Data Flow Diagram

```
User A (Client)                Server               User B (Client)
    │                           │                        │
    ├─ Enter name ─────────────>│                        │
    │                      Register & store              │
    │<──────── members list ────┤                        │
    │                           ├──── onconnect ──────> │
    │                           │                   Update UI
    │                           │
    ├─ Send message ───────────>│                        │
    │                      Log & broadcast               │
    │<────────── members list ──┤                        │
    │                           ├────── message ──────> │
    │                           │                  Show message
    │                           │
    └─ Disconnect ──────────────>│<─────────────────────┘
                           Update & broadcast
```

---

## Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Backend will run on:** `http://localhost:3000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend will run on:** `http://localhost:5173` (Vite default)

---

## How to Use

1. **Start the Backend**
   ```bash
   cd backend && npm run dev
   ```

2. **Start the Frontend**
   ```bash
   cd frontend && npm run dev
   ```

3. **Open Multiple Browser Tabs/Windows**
   - Navigate to the frontend URL (typically `http://localhost:5173`)
   - Open in multiple windows to simulate multiple users

4. **Join the Chat**
   - Enter your username and click "Continue"
   - You'll see the chat interface and member list

5. **Send Messages**
   - Type a message in the input field
   - Click "Send" or press Enter
   - Messages appear in real-time for all connected users

6. **See Notifications**
   - When users join or leave, you'll see notification messages
   - Member list updates automatically

---

## Environment Variables

Currently, the application uses hardcoded values:
- **Backend Port**: `3000` (src/index.js)
- **Socket.IO URL**: `http://localhost:3000` (frontend/src/socket.js)

For production, consider creating `.env` files and using environment variables.

---

## Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running on port 3000
- Check browser console for CORS errors
- Verify Socket.IO URL in `frontend/src/socket.js`

### Messages not appearing
- Check if backend is receiving messages (see console logs)
- Verify Socket.IO connection is established
- Try refreshing the page

### Port already in use
- Change the port in `backend/src/index.js`
- Update the Socket.IO URL in `frontend/src/socket.js` accordingly

---

## Available Scripts

### Backend
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Run production build
```

### Frontend
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

