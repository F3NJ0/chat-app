import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text } from 'react-native';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLYgpsZxcVYcLK-GxcFUxOYmk4wvMoaSs",
  authDomain: "chat-app-fcf9c.firebaseapp.com",
  projectId: "chat-app-fcf9c",
  storageBucket: "chat-app-fcf9c.appspot.com",
  messagingSenderId: "637907406675",
  appId: "1:637907406675:web:5a3ce6dd05b7624a8f9ba6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default function Chat(props) {
  let { name, color } = props.route.params;

  // State to hold messages
  const [messages, setMessages] = useState([]);
  // User uid for authentication
  const [uid, setUid] = useState();
  // User object for Gifted Chat
  const [user, setUser] = useState({
    _id: '',
    name: '',
    avatar: '',
  });

  // Create reference to the shopping list collection on firestore
  const messagesRef = collection(db, 'messages');

  // Set the screen title to the user name entered in the start screen
  useEffect(() => {
    props.navigation.setOptions({ title: name });

    const auth = getAuth();

    const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await signInAnonymously(auth);
      }

      // Set states for user uid and logged in text
      setUid(user.uid);
      setMessages([]);
      setUser({
        _id: user.uid,
        name: name,
        avatar: 'https://placeimg.com/140/140/any',
      });

      const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(messagesQuery, onCollectionUpdate);

    });

    return () => {
      authUnsubscribe();
    }
  }, [uid]);


  // Add the last message of the messages state to the Firestore messages collection
  const addMessage = (message) => {
    addDoc(messagesRef, {
      uid: uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: user
    });
  }

  // Appending the created message to the messages state, then calling addMessage to add to Firestore
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    addMessage(messages[0]);
  }, [])

  // Reading snapshot data for messages collection, adding messages to messages state
  const onCollectionUpdate = (querySnapshot) => {
    const messages = []
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user
      });
    });
    setMessages(messages);
  }

  // Customize the color of the sender bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }


  return (
    <View style={[{ backgroundColor: color }, styles.container]}>
      <GiftedChat
        renderBubble={renderBubble.bind()}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
        }}
      />

      {/* Avoid keyboard to overlap text messages on older Andriod versions */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})