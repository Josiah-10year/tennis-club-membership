import { Court } from "@/types/Court";
import { getCourtBookings, getCourtID, addCourtBookings } from "../../../../../../sanity/sanity-utils";
import Calendar from "../../../../../components/CalendarTestJV"
import {add, format} from 'date-fns'

type Props = {
    params: { courtName: string, datetime: string, type: string, numPersons: number}
}

export default async function CourtBookings({params}: Props){ // in () put  

    //output string
    let output = ""
    //properly format booking information
    const decodedCourtName = decodeURIComponent(params.courtName)
    const decodedDatetime = decodeURIComponent(params.datetime)
    const dateObj = new Date(decodedDatetime);
    const endDatetime = add(dateObj, {hours: 1});
    const formattedDatetime = dateObj.toISOString();
    const formattedEndDatetime = endDatetime.toISOString();
    const decodedType = decodeURIComponent(params.type)
    const decodedNumPersons = params.numPersons

    //prep courtname to get id to use in booking query
    const courtlist : Court[] = await getCourtID(decodedCourtName.toString());
    let courtID = ""
    courtID = courtlist[0]._id

    //now pull bookings that match the timeslot and court
    const bookings = await getCourtBookings(formattedDatetime.toString(), courtID.toString()); //, decodedType.toString(), decodedNumPersons, decodedCourtName.toString()
    console.log(bookings)

    //we also need to pull the user id but for now
    const userID = "68028cac-7cde-4489-be2c-a601df250af0"
    
    if(bookings.length > 0){

        //firstly we only want to go here if the person wants an open booking
        if(decodedType == "open"){

            //booking is present now we got to distinguish between open and private bookings
            if(bookings[0].type == "private"){ //if its private it will only have one booking therefore itll be in index 0
                //do not book
                output = "Error, Cannot Book. Someone has already booked this time"
            }else{
                //this means that there is an open booking for us in that time slot, we just need to verify the number of persons
                //traverse and tally up
                let sum = 0
                for (const booking of bookings) {
                    sum = sum + booking.numPeople
                }

                //now this sum must be compatible with number of people we are trying to let in the booking i.e. open is max 4
                if((sum + decodedNumPersons) <= 4){
                    // we can join the open booking
                    const done = await addCourtBookings(courtID, formattedDatetime, formattedEndDatetime, decodedType, decodedNumPersons, userID )

                    if(done){
                        output = "Your booking has successfully been made"
                    }else{
                        output = "Error creating booking. The booking could not be made at this time. Check the console for more details"
                    }

                }
                else{
                    //there are too many people in the open booking
                    output = "Error, Cannot Book. An open booking is available but you have too many persons to join this session"
                }

            }

        }else{
            //do not book
            output = "Error, Cannot Book. Someone has already booked this time"
        }

    }else{
        //We can book freely
        const done = await addCourtBookings(courtID, formattedDatetime, formattedEndDatetime, decodedType, decodedNumPersons, userID )

        if(done){
            output = "Your booking has successfully been made"
        }else{
            output = "Error creating booking. The booking could not be made at this time. Check the console for more details"
        }
    }

    return(

        <div>
            <h3>Court Bookings Page</h3>
            <h3>The calendar and booking details</h3>
            <h3>The content is being hidden by the nav bar but its here</h3>
            Your Booking: <br></br>
            {decodedCourtName} <br></br>
            {formattedDatetime} <br></br>
            {decodedType} <br></br>
            {decodedNumPersons} <br></br><br></br>
            Outcome: {output}

        </div>

    );

    //params.courtName
    //test

}