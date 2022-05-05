import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text } from 'react-native';


import { collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";

import { auth, db } from '../config/firebase';




export default function Chat(props) {
  let { name, color } = props.route.params;

  // State to hold messages
  const [messages, setMessages] = useState([]);


  // Create reference to the shopping list collection on firestore
  const messagesRef = collection(db, 'messages');

  // Set the screen title to the user name entered in the start screen
  useEffect(() => {
    props.navigation.setOptions({ title: name });
    const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(messagesQuery, onCollectionUpdate);


    return () => unsubscribe();
  }, []);


  // Add the last message of the messages state to the Firestore messages collection
  const addMessage = (message) => {
    addDoc(messagesRef, {
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user
    });
  }

  // Appending the created message to the messages state, then calling addMessage to add to Firestore
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    addMessage(messages[0]);
  }, [])

  // Reading snapshot data for messages collection, adding messages to messages state
  const onCollectionUpdate = (querySnapshot) => {
    setMessages(
      querySnapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))
    )
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
    <View
      style={[{ backgroundColor: color }, styles.container]}
    >
      <GiftedChat
        renderBubble={renderBubble.bind()}
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth?.currentUser?.uid,
          name: name,
          avatar: 'https://placeimg.com/140/140/any'
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