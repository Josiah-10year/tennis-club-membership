import { getEvents } from "../sanity/sanity-utils";
import Link from "next/link";

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="max-w-5xl mx-auto py-20">
      {/* Start here */}
      <h1>January</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.name}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.date).toLocaleTimeString()}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Location: {event.location}
            </div>
            </Link>
        ))}
      </div>
      {/* from here */}
      <h1>Feburary</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.name}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.date).toLocaleTimeString()}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Location: {event.location}
            </div>
            </Link>
        ))}
      </div>
      {/* from here */}
      <h1>March</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.name}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.date).toLocaleTimeString()}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Location: {event.location}
            </div>
            </Link>
        ))}
      </div>
      {/* from here */}
      <h1>April</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.name}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.date).toLocaleTimeString()}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Location: {event.location}
            </div>
            </Link>
        ))}
      </div>
      {/* from here */}
      <h1>May</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.name}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.date).toLocaleTimeString()}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Location: {event.location}
            </div>
            </Link>
        ))}
      </div>
      {/* from here */}
      <h1>June</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.name}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.date).toLocaleTimeString()}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Location: {event.location}
            </div>
            </Link>
        ))}
      </div>
      {/* from here */}
      <h1>July</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.name}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.date).toLocaleTimeString()}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Location: {event.location}
            </div>
            </Link>
        ))}
      </div>
      {/* from here */}
      <h1>August</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.name}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.date).toLocaleTimeString()}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Location: {event.location}
            </div>
            </Link>
        ))}
      </div>
      {/* from here */}
      <h1>September</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.name}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.date).toLocaleTimeString()}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Location: {event.location}
            </div>
            </Link>
        ))}
      </div>
      {/* from here */}
      <h1>October</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.name}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.date).toLocaleTimeString()}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Location: {event.location}
            </div>
            </Link>
        ))}
      </div>
      {/* from here */}
      <h1>November</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.name}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.date).toLocaleTimeString()}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Location: {event.location}
            </div>
            </Link>
        ))}
      </div>
      {/* from here */}
      <h1>December</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.name}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.date).toLocaleTimeString()}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Location: {event.location}
            </div>
            </Link>
        ))}
      </div>
      {/* from here */}
    </div>
   );
}