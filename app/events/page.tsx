import { getEvents } from "../../sanity/sanity-utils";
import Calendar from "../components/EventCalendarTest"

export default async function Event() {
  const events = await getEvents();

  return (
    <div className="max-w-5xl mx-auto py-20">
      <center><h1>Upcoming Events</h1></center>
      <br></br>
      <div className="h-95vh">
      <Calendar eventArrayProp={events} />
      </div>
      <br></br>
    </div>
  );
}

