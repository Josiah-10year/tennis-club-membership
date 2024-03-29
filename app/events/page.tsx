// import { getEvent } from "@/sanity/sanity-utils";

// type Props = {
//     params: { event: string }
// }

// export default async function Events({params}: Props) {

//     const slug = params.event;
//     const event = await getEvent(slug);

//     if (!event) {
//         return <div>No event found</div>;
//     } 
//     //to be turned into a 404 error handeling

//     return(
//         <div>
//             <h3>Event Details</h3>
//             <h3>The schdeule of events will go here</h3>
//             <h3>The content is being hidden by the nav bar but its here</h3>
//             <div>{event.name}</div>
//         </div>

//     );

// }

import { getEvents } from "@/sanity/sanity-utils";
import Link from "next/link";

export default async function Events() {
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
            </Link>
        ))}
      </div>
    </div>
   );
}

// import Link from 'next/link';

// interface Event {
//   _id: string;
//   name: string;
//   slug: string;
//   date: Date;
//   location: string;
// }

// interface EventsCalendarProps {
//   events: Event[];
// }

// const EventsCalendar: React.FC<EventsCalendarProps> = ({ events }) => {
//   return (
//     <div className="max-w-5xl mx-auto py-20">
//       {/* Start here */}
//       <h1>January</h1>
//       <div className="mt-5 grid grid-cols-3 gap-8">
//         {events.map((event) => (
//           <Link 
//             href="/events/${event.slug}" 
//             key={event._id} 
//             className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition">
            
//             <div 
//               className="font-extrabold text-xl mb-2 bg-gradient-to-r from-red-500 to-green-500 text-transparent bg-clip-text">
//               {event.name}
//             </div>
//             <div 
//               className="text-gray-600 mb-2">
//               Date: {new Date(event.date).toLocaleDateString()} 
//             </div>
//             <div 
//               className="text-gray-600 mb-2">
//               Time: {new Date(event.date).toLocaleTimeString()}
//             </div>
//             <div 
//               className="text-gray-600 mb-2">
//               Location: {event.location}
//             </div>
//             </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EventsCalendar;
