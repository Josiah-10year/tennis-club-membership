import event from "@/sanity/schemas/events-schema";
import {getEvents} from "../sanity/sanity-utils";

export default async function Home() {
  const event = await getEvents();

  return (
    <div className="max-w-5xl mx-auto py-20"> 

      <h1>Tennis Club Membership</h1>

      {event.map((event) => (
          <div key= {event._id} className="border border-grey-500 rounded-lg">
            {event.image && (
              <image src=
            )}
          
          <div className="font-extrabold bg-gradient-to-r">
            {event.name}
          </div>
        ))
      }
    </div>
    )
}