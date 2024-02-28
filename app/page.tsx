import event from "@/sanity/schemas/events-schema";
import {getEvents} from "../sanity/sanity-utils";

export default async function Home() {
  const event = await getEvents();

  return (
    <div> 
      {event.map((event) => (
          <div key= {event._id}>{event.name}</div>
        ))
      }
    </div>
    )
}