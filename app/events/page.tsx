//"use client"
import { getEvents } from "../../sanity/sanity-utils";
import Link from "next/link";
import Calendar from "../components/EventCalendarTest"

export default async function Event() {
  const events = await getEvents();
  console.log(events)

  return (
    <div className="max-w-5xl mx-auto py-20">
      {/* Start here */}
      {/* <h1>About Page</h1>
      <h1>January</h1> */}

      <Calendar eventArrayProp={events} />
      <br></br>
    </div>
   );
}

