// pages/api/createRoom.js
import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: "AIzaSyCfuy7L9PXjTtRYnNa3crNE7ecA-KWAslI",
  authDomain: "tennis-club-platform.firebaseapp.com",
  projectId: "tennis-club-platform",
  storageBucket: "tennis-club-platform.appspot.com",
  messagingSenderId: "300239757122",
  appId: "1:300239757122:web:918f82bc2a3a8e16b7b2db",
  measurementId: "G-PMWXYDSPQW"
});


const firebaseWithFirestore = firebase as any;
const db = firebaseWithFirestore.firestore();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { roomName } = req.body;

    const roomRef = db.collection('rooms').doc();
    const roomId = roomRef.id;

    await roomRef.set({
      roomId,
      roomName,
    });

    res.status(201).json({ roomId });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
