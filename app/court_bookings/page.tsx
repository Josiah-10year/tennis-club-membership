import { add, format } from "date-fns";
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '../constants/config'
import { getCourtBookings, getCourtBookingsAfterToday, getCourts } from "../../sanity/sanity-utils";
import Calendar from "../components/CalendarTestJV"
import { CourtBooking } from "@/types/CourtBooking";
export default async function CourtBookings(){

    const courtsArray = await getCourts();
    //organize array of days that are booked up, and also pass array of all bookings >= today; array of filled days used for calendar, and
    //array of all bookings >= today used to check the time slots given court ID

    const courtBookingsArray : CourtBooking[] = await getCourtBookingsAfterToday();

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



    return(

        <div>
            <h3>Court Bookings Page</h3>
            <h3>The calendar and booking details</h3>
            <h3>The content is being hidden by the nav bar but its here</h3>
            <div><Calendar stringArrayProp={courts} fullyBookedDates={fullyBookedDates} courtBookingsArray={courtBookingsArray} /></div>
        </div>

    );
}