import { useRouter } from 'next/navigation';
import { getCourts } from "../../../../../sanity/sanity-utils";
import Calendar from "../../../../components/CalendarTestJV"

type Props = {
    params: { courtName: string, datetime: string, type: string}
}

export default async function CourtBookings({params}: Props){ // in () put  

    const decodedCourtName = decodeURIComponent(params.courtName)
    const decodedDatetime = decodeURIComponent(params.datetime)
    const decodedType = decodeURIComponent(params.type)

    return(

        <div>
            <h3>Court Bookings Page</h3>
            <h3>The calendar and booking details</h3>
            <h3>The content is being hidden by the nav bar but its here</h3>
            {decodedCourtName}
            {decodedDatetime}
            {decodedType}
        </div>

    );

    //params.courtName
    //test

}