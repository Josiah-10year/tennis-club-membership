import { add, format } from "date-fns";
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '../constants/config'
import { getCourtBookings, getCourtBookingsAfterToday, getCourts, getUser } from "../../sanity/sanity-utils";
import Calendar from "../components/CalendarTestJV"
import { CourtBooking } from "@/types/CourtBooking";
import { authConfig, loginIsRequiredServer } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

export default async function CourtBookings(){
    await loginIsRequiredServer();

    const courtsArray = await getCourts();
    //organize array of days that are booked up, and also pass array of all bookings >= today; array of filled days used for calendar, and
    //array of all bookings >= today used to check the time slots given court ID

    const courtBookingsArray : CourtBooking[] = await getCourtBookingsAfterToday();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const url = 'https://46b4kxer.api.sanity.io/v2021-06-07/data/query/production?query=*[_type =="booking"][start >= "' + today.toISOString() + '"]'
    // const testArray1 : CourtBooking[] = await fetchData(url);
    // //const testArray : CourtBooking[] = testArray1.
    // console.log("Test: " + testArray1)

    const getFullyBookedDates = (courtBookings: CourtBooking[]) => {
        const fullyBookedDatesSet = new Set<string>();
    
        courtBookings.forEach(booking => {
            const bookingStartDate = new Date(booking.start);
            const bookingDateISO = format(bookingStartDate, "yyyy-MM-dd");
            
            // Check if all time slots for the day are booked
            let allTimeSlotsBooked = true;
            const beginning = add(new Date(bookingDateISO), { hours: STORE_OPENING_TIME });
            const end = add(new Date(bookingDateISO), { hours: STORE_CLOSING_TIME });
            const interval = INTERVAL;
    
            for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
                const timeSlot = format(i, "yyyy-MM-dd'T'HH:mm:ssxxx");
                let timeSlotBooked = false;
                courtBookings.forEach(otherBooking => {
                    const otherBookingStartDate = new Date(otherBooking.start);
                    const otherBookingDateISO = format(otherBookingStartDate, "yyyy-MM-dd'T'HH:mm:ssxxx");
                    if (otherBookingDateISO === timeSlot) {
                        timeSlotBooked = true;
                    }
                });
                if (!timeSlotBooked) {
                    allTimeSlotsBooked = false;
                    break;
                }
            }
    
            // If all time slots for the day are booked, add the date to the set
            if (allTimeSlotsBooked) {
                fullyBookedDatesSet.add(bookingDateISO);
            }
        });
    
        return Array.from(fullyBookedDatesSet);
    }
    
    const fullyBookedDates = getFullyBookedDates(courtBookingsArray);

    const courts : string[] = []
        let x = 0;

        for (const item of courtsArray) {
            courts[x]=(item.name);
            x=x+1
        }

        courts.sort()

        //we also need to pull the user id but for now
        const session = await getServerSession(authConfig);
        const username = session?.user?.email
        let userID = ""
        if (username){
            const userID2 = await getUser(username);
            userID = userID2[0]._id
        }else{
        //something wrong defaulted to john
        userID = "68028cac-7cde-4489-be2c-a601df250af0"
        }



    return(

        <div>
            <div><Calendar stringArrayProp={courts} fullyBookedDates={fullyBookedDates} courtBookingsArray={courtBookingsArray} userID= {userID}/></div>
        </div>

    );
}