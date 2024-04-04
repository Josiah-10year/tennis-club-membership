// Next.js Serverless Function to Create a New Board
import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/app';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    // your Firebase config
  });
}

const db = firebase.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { boardName } = req.body;

    const boardRef = db.collection('boards').doc();
    const boardId = boardRef.id;

    await boardRef.set({
      boardId,
      boardName,
      posts: [],
    });

    res.status(201).json({ boardId });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
