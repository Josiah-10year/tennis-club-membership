'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// type Room = {
//   roomId: string;
//   roomName: string;
// };

 async function Room(){
//   const [rooms, setRooms] = useState<Room[]>([]);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       const response = await axios.get<{ rooms: Room[] }>('./components/api/getRooms');
//       setRooms(response.data.rooms);
//     };

//     fetchRooms();
//   }, []);

//   const joinRoom = (roomId: string) => {
//     // Implement the logic to join the room
//     console.log(`Joining room ${roomId}`);
//   };

  return (
    <div>
      <h2>Select a Chat Room</h2>
      <h2>Select a Chat Room</h2>
      <h2>Select a Chat Room</h2>
      <h2>Select a Chat Room</h2>
      <h2>Select a Chat Room</h2>
    </div>
  );
}

export default Room;
