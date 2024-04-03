import { getCourts } from "../../sanity/sanity-utils";
import Calendar from "../components/CalendarTestJV"
export default async function CourtBookings(){

    const courtsArray = await getCourts();

    const courts : string[] = []
        let x = 0;

        for (const item of courtsArray) {
            console.log(item);
            console.log(item.name);
            // courts.push(item.name);
            courts[x]=(item.name);
            console.log(x)
            x=x+1
        }

        courts.sort()



    return(

        <div>
            <h3>Court Bookings Page</h3>
            <h3>The calendar and booking details</h3>
            <h3>The content is being hidden by the nav bar but its here</h3>
            <div><Calendar stringArrayProp={courts}/></div>
        </div>

    );
}