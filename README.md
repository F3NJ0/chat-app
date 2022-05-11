# React Native Chat app

## Description
The aim of this project is to build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

### User Stories
* As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

### Key Features
* A page where users can enter their name and choose a background color for the chat screen before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat must provide users with two additional communication features: sending images
and location data.
* Data gets stored online and offline.


### What technology did I use and why?

I chose to create the mobile application using **React Native** due to the following considerations:
* Develop and maintain the same codebase across different OS (iOS and Android)
* Increased performance compared to Hybrid Apps as UI is rendered natively
* Possibility to access device's APIs (camera, microphone, ...) (compared to PWA)
* Use existing skills in JavaScript and React, no need to learn another programming language
* Large and active community

Further, I'm using **XCode** as an iOS simulator and **Android Studio** as an Android emulator.

I use **Expo** as development environment to develop and test the app.

I use the **React Navigation** third party library to navigate between screens.

I use the React Native **Gifted Chat** library to create the UI of my chat app. The library has good GitHub statistics and is well documented. Further, it already provides predefined components for integral parts of the chat app:
* Message bubbles
* A message input field
* A send button
* Options for displaying user names and avatars

I'm working with **WebSocket** as a real-time application technology as it fulfills the following requirements of my chat application:
* Transmitting in- and outgoing data immediately
* Two-way communication between clients and server
* Avoids data bloat compared to long polling

I use **Cloud Firestore** as data storage platform for this application. real-time data

### What challenges did I face, what did I learn?
* The React Native Button component only supports a minimal level of customization. To customize buttons, use Pressable or Touchable components.

* There is a new Firestore version v9 available which differs greatly from v7 used in the CF examples. I decided to use v9 in this application, relying on the Firebase documentation.

* Using functional components instead of class components, handling the onAuthStateChanged and signInAnonymously functions from Firebase within the useEffect() Hook of the Chat.js component resulted in issues with the user creation. When trying to send a message, the user object was still empty, leading to an error in the addDoc() function. Therefore, I have decided to move the user sign up (signInAnonymously) to the Start.js component and the onAuthStateChanged into the App.js component. This ensures that a user can only access the Chat screen and thus send messages when they are successfully authenticated. (See also this blog post for further details: https://blog.jscrambler.com/build-a-chat-app-with-firebase-and-react-native )

* When using the useState hook in functional components, setting states don't have a callback. Therefore, to ensure that the newest state is used in other functions, they have to be included in the useEffect Hook (see this blog for further details: https://medium.com/@sanjeewafern/perform-an-immediate-action-after-setting-state-on-a-state-variable-with-react-functional-component-e9e1526f655a)

* The expo-permissions library used by CF is depreated. Should use expo-media-library instead in future projects, see this documentation: https://docs.expo.dev/versions/latest/sdk/media-library/ 


## Development Process for the chat application
### Set up Expo as Development Environment
1. Install Expo Command Line Interface
```bash
npm install expo-cli --global
```

2. Create new Expo project in projects directory
```bash
expo init [project-name]
```

3. Start expo by navigating to project folder & running
```bash
npm start
```

### Install React Navigation library to navigate between screens
1. Navigate to project folder and run
```bash
npm install react-navigation
```

2. Install necessary dependencies
```bash
npm install @react-navigation/native @react-navigation/stack
expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

### Set up Android Studio as Android Emulator
1. Download Android Studio
2. Make sure 'Android Virtual Device' is installed
3. Add Android SDK Location to ~/.zshrc file
```bash
export ANDROID_SDK=/Users/myuser/Library/Android/sdk
export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH
```
4. Create virtual device (via more actions > Virtual Device Manager) and click play to start
5. Select 'Run app on Android' in Expo to run app on virtual device
6. Press Command + Shift + R to start a screen recording.

### Integreat Gifted Chat library to create chat UI
1. Install Gifted Chat
```bash
npm install react-native-gifted-chat
```

2. Integrate Gifted Chat into application
```bash
import { GiftedChat } from 'react-native-gifted-chat';
```

3. Follow instructions to set up chat: https://github.com/FaridSafi/react-native-gifted-chat 

### Set up Cloud Firestore as data storage platform
1. Install Firestore via Firebase
```bash
npm install firebase
```

2. Import Firestore in application (e.g, in Chat.js)
```bash
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
```

3. Register App in Firebase settings

4. Copy config code to application

5. Initialize app
```bash
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
```

6. Set up anonymous authentication in firebase console

### Set up Async Storage for offline functionalities
1. Install package
```bash
expo install @react-native-community/async-storage
```

2. Import AsyncStorage into app
```bash
import AsyncStorage from '@react-native-community/async-storage';
```

3. Store and retrieve state from Async Storage