import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    
      apiKey: "AIzaSyCfuy7L9PXjTtRYnNa3crNE7ecA-KWAslI",
      authDomain: "tennis-club-platform.firebaseapp.com",
      projectId: "tennis-club-platform",
      storageBucket: "tennis-club-platform.appspot.com",
      messagingSenderId: "300239757122",
      appId: "1:300239757122:web:918f82bc2a3a8e16b7b2db",
      measurementId: "G-PMWXYDSPQW"
});
}

const db = firebase.firestore();

type Room = {
  id: string;
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const snapshot = await db.collection('rooms').get();
    const rooms: Room[] = snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name
    }));

    res.status(200).json({ rooms });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
