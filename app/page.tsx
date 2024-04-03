import { getEvents } from "../sanity/sanity-utils";
import Link from "next/link";

export default async function About() {
  const events = await getEvents();
  console.log(events)

  return (
    <div className="max-w-5xl mx-auto py-20">
      {/* Start here */}
      <h1>About Page</h1>
      <h1>January</h1>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
          
            href="/events/${event.slug}" 
            key={event._id} 
            className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
            <div 
              className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
              {event.title}
            </div>
            <div 
              className="text-gray-600 mb-2">
              Start Date: {new Date(event.start).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.start).toLocaleTimeString()}
            </div>

            <div 
              className="text-gray-600 mb-2">
              End Date: {new Date(event.end).toLocaleDateString()} 
            </div>
            <div 
              className="text-gray-600 mb-2">
              Time: {new Date(event.end).toLocaleTimeString()}
            </div>
            </Link>
        ))}
      </div>
    </div>
   );
}