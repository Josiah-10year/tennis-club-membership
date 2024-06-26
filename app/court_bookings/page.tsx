import { add, format } from "date-fns";
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '../constants/config'
import { getCourtBookingsAfterToday, getCourts, getUser } from "../../sanity/sanity-utils";
import Calendar from "../components/CalendarTestJV"
import { CourtBooking } from "@/types/CourtBooking";
import { authConfig, useloginIsRequiredServer } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { Court } from "@/types/Court";

export default async function CourtBookings() {
    await useloginIsRequiredServer();

    const courtsArray = await getCourts();
    const courtBookingsArray: CourtBooking[] = await getCourtBookingsAfterToday();

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

    function sortCourtsByName(courts: Court[]): Court[] {

        return courts.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
    const courts = sortCourtsByName(courtsArray);

    //we also need to pull the user id but for now
    const session = await getServerSession(authConfig);
    const username = session?.user?.email
    let userID = ""
    if (username) {
        const userID2 = await getUser(username);
        userID = userID2[0]._id
    } else {
        //something wrong defaulted to john
        userID = "68028cac-7cde-4489-be2c-a601df250af0"
    }

    return (
        <div className="max-w-5xl mx-auto py-20">
            <h1 className="text-left py-8">Court Booking</h1>
            <Calendar courtArrayProp={courts} fullyBookedDates={fullyBookedDates} courtBookingsArray={courtBookingsArray} userID={userID} />
        </div>
    );
}