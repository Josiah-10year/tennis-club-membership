"use client"
import { Court } from "@/types/Court";
import { getCourtBookings, getCourtID, addCourtBookings, getUser } from "../../../../../../../sanity/sanity-utils";
import { add } from 'date-fns'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { loginIsRequiredClient } from "@/app/lib/auth";//loginIsRequiredClient

type Props = {
    params: { courtName: string, datetime: string, type: string, numPersons: number, userID: string }
}

export default async function CourtBookings({ params }: Props) { // in () put  
    await loginIsRequiredClient()

    const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms));
    //output string
    let output = ""
    //properly format booking information
    const decodedCourtName = decodeURIComponent(params.courtName)
    const decodedDatetime = decodeURIComponent(params.datetime)
    const dateObj = new Date(decodedDatetime);
    const endDatetime = add(dateObj, { hours: 1 });
    const formattedDatetime = dateObj.toISOString();
    const formattedEndDatetime = endDatetime.toISOString();
    const decodedType = decodeURIComponent(params.type)
    const decodedNumPersons = parseInt(params.numPersons.toString(), 10); // Parse as integer
    const decodedUserID = decodeURIComponent(params.userID)

    //prep courtname to get id to use in booking query
    const courtlist: Court[] = await getCourtID(decodedCourtName.toString());
    let courtID = ""
    courtID = courtlist[0]._id

    //now pull bookings that match the timeslot and court
    const bookings = await getCourtBookings(formattedDatetime.toString(), courtID.toString()); //, decodedType.toString(), decodedNumPersons, decodedCourtName.toString()


    const userID = "68028cac-7cde-4489-be2c-a601df250af0"

    //"68028cac-7cde-4489-be2c-a601df250af0"
    if (bookings.length > 0) {

        //firstly we only want to go here if the person wants an open booking
        if (decodedType == "open") {

            //booking is present now we got to distinguish between open and private bookings
            if (bookings[0].type == "private") { //if its private it will only have one booking therefore itll be in index 0
                //do not book
                output = "Error, Cannot Book. Someone has already booked this time"
            } else {
                //this means that there is an open booking for us in that time slot, we just need to verify the number of persons
                //traverse and tally up
                let sum = 0
                console.log("Sum: " + sum)
                for (const booking of bookings) {
                    console.log("Booking num persons: " + booking.numPeople)
                    sum += booking.numPeople

                }
                console.log("Sum + bookings: " + sum)
                sum += decodedNumPersons
                console.log("Sum + this number of persons: " + sum)
                //now this sum must be compatible with number of people we are trying to let in the booking i.e. open is max 4
                if (sum <= 4) {
                    // we can join the open booking
                    const done = await addCourtBookings(courtID, formattedDatetime, formattedEndDatetime, decodedType, decodedNumPersons, decodedUserID)

                    if (done) {
                        output = "Your booking has successfully been made"
                    } else {
                        output = "Error creating booking. The booking could not be made at this time. Check the console for more details"
                    }
                } else {
                    //there are too many people in the open booking
                    output = "Error, Cannot Book. An open booking is available but you have too many persons to join this session"
                }
            }

        } else {
            //do not book
            output = "Error, Cannot Book. Someone has already booked this time"
        }

    } else {
        //We can book freely
        const done = await addCourtBookings(courtID, formattedDatetime, formattedEndDatetime, decodedType, decodedNumPersons, decodedUserID)

        if (done) {
            output = "Your booking has successfully been made"
        } else {
            output = "Error creating booking. The booking could not be made at this time. Check the console for more details"
        }
    }

    revalidatePath('/court_bookings') // Update cached posts
    revalidatePath('/account') // Update cached posts
    redirect(`/account`) // Navigate to the new post page

    return (
        <div className="max-w-5xl mx-auto py-20">
            <h1 className="text-left py-8">Court Booking</h1>
            Your Booking: <br></br>
            {decodedCourtName} <br></br>
            {formattedDatetime} <br></br>
            {decodedType} <br></br>
            {decodedNumPersons} <br></br><br></br>
            Outcome: {output}<br></br><br></br>
            You will be redirected shortly...
        </div>
    );
}