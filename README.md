# Real Chat App - Client

This is the client side of the Real Chat App. It is a React app that uses the [Real Chat App - Server](https://github.com/Ashik-Mahmud/real-chat-app-server)
Where peoples can chat each others and also can create their own chat room. It's completely free and real time.

## Using Technologies

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^1.8.1",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.0.1",
    "@testing-library/user-event": "^14.1.1",
    "@types/jest": "^27.4.1",
    "@types/node": "^17.0.25",
    "@types/react": "^18.0.6",
    "@types/react-dom": "^18.0.2",
    "axios": "^1.1.3",
    "cogo-toast": "2.0.1",
    "date-fns": "^2.29.3",
    "emoji-picker-react": "^4.4.5",
    "react": "^18.2.0",
    "react-cookie": "^4.1.1",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.39.4",
    "react-icons": "^4.6.0",
    "react-query": "^3.39.2",
    "react-redux": "^8.0.1",
    "react-router-dom": "6.4.3",
    "react-scripts": "5.0.1",
    "react-scroll-to-bottom": "^4.2.0",
    "react-select": "^5.6.1",
    "react-spinners": "^0.13.6",
    "socket.io-client": "^4.5.3",
    "sweetalert": "^2.1.2",
    "typescript": "^4.6.0",
    "universal-cookie": "^4.0.4",
    "web-vitals": "^2.1.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@types/react-scroll-to-bottom": "^4.2.0",
    "autoprefixer": "^10.4.13",
    "postcss": "^8.4.19",
    "tailwindcss": "^3.2.4"
  }
}
```

## Required Features

### In both Group and Private Chat

- [x] User can create an account
- [x] User can login
- [x] User can create a chat room and invite other users
- [x] User can join a chat room and chat with other users
- [x] User can see all the chat rooms he/she has joined
- [x] User can see all the users he/she has invited
- [x] User can block someone from chatting with him/her
- [x] User can see all the users he/she has blocked and also can unblock them
- [x] User can remove a chat room with friends he/she has invited
- [x] User also can remove him/her sent messages and also copy someone else messages and send it to someone else

### In the Group Chat

- [x] User can see all the users in the chat room
- [x] User can copy the group code to share someone to join this group
- [x] User can leave the group
- [x] User can see all the messages in the group
- [x] As someone admin of the group, he/she can remove any user from the group
- [x] As someone admin of the group, he/she can remove any message from the group
- [x] As someone admin of the group, he/she can add someone to the group
- [x] As someone admin of the group, he/she can change the group name
- [x] As someone admin of the group, he/she can delete the group

## Live Site

[Real Chat App](https://real-chat-app-client.vercel.app/)

## Server Side Code

[Real Chat App - Server](https://github.com/Ashik-Mahmud/real-chat-app-server)

## Preview Image

![previewImage](./preview.png)

> Thanks for reach out me on github. If you have any query please contact me.
