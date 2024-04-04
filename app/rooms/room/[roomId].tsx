import React, { useState, useEffect, useRef } from 'react';

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';  

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { onSnapshot } from '@firebase/firestore';

type Message = {
  id: string;
  text: string;
  uid: string;
  photoUrl: string;
};

firebase.initializeApp({
  apiKey: "AIzaSyBvDuAcrqb8LDTq-Cgy-8XdPiPYyR1kfZ0",
  authDomain: "superchat-9a69c.firebaseapp.com",
  projectId: "superchat-9a69c",
  storageBucket: "superchat-9a69c.appspot.com",
  messagingSenderId: "113222082528",
  appId: "1:113222082528:web:6b1bc57b00b13828db1585"
})

const auth = firebase.auth();
const messagesRef = firebase.firestore().collection('messages');
const firestore = firebase.firestore();



function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formValue, setFormValue] = useState('');
  const theEnd = useRef<HTMLDivElement>(null);

  const msgRef = firestore.collection('messages');

  useEffect(() => {
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const messagesArray: Message[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Message; // Ensure correct typing
        messagesArray.push({ ...data, id: doc.id });
      });
  
      setMessages(messagesArray);
      if (theEnd.current) {
        theEnd.current.scrollIntoView({ behavior: 'smooth' });
      }
    });
  
    return () => unsubscribe();
  }, [messagesRef]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (user) {
      const { uid, photoURL } = user; // Fix: Update 'photoUrl' to 'photoURL'

      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL, // Fix: Update 'photoUrl' to 'photoURL'
      });

      setFormValue('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.text}</strong>
            <span> - {message.uid}</span>
          </div>
        ))}
        <div ref={theEnd}></div>
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
