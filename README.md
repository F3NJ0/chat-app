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

### What challenges did I face, what did I learn?
* The React Native Button component only supports a minimal level of customization. To customize buttons, use Pressable or Touchable components.


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
4. Create virtual device and click play to start
5. Select 'Run app on Android' in Expo to run app on virtual device
