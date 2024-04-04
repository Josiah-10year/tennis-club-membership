import { createClient, groq } from "next-sanity"
import { Event } from "../types/Event"
import { NoticeBoard } from "../types/NoticeBoard"
import { Court } from "../types/Court"
import { CourtBooking } from "../types/CourtBooking"

export async function getEvents(): Promise<Event[]> {
    const client = createClient({
        projectId: "46b4kxer",
        dataset: "production",
        apiVersion: "2024-02-27"
    })

    return client.fetch(
        groq`*[_type == "event"]{
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            start,
            end,
            location,
            description
        }`
    )
}

export async function getEvent(slug: string): Promise<Event> {
    const client = createClient({
        projectId: "46b4kxer",
        dataset: "production",
        apiVersion: "2024-02-27"
    })

    return client.fetch(
      groq`*[_type == "event"]{
          _id,
          _createdAt,
          name,
          "slug": slug.current,
          date,
          location,
          description
      }`
  )
}

export async function getNoticeBoards(): Promise<NoticeBoard[]> {
    const client = createClient({
        projectId: "46b4kxer",
        dataset: "production",
        apiVersion: "2024-02-27"
    })

    return client.fetch(
        groq`*[_type == "noticeBoard"]{
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            
        }`
    )
}

///////////////////Functions to pull courts//////////////////////////
/////////////////////////////////////////////////////////////////////

export async function getCourts(): Promise<Court[]> {
    const client = createClient({
        projectId: "46b4kxer",
        dataset: "production",
        apiVersion: "2024-02-27"
    })

    return client.fetch(
        groq`*[_type == "court"]{
            _id,
            _createdAt,
            name
        }`
    )
}

///////////////////Functions to find if booking is there//////////////////////////
//////////////////////////////////////////////////////////////////////////////////

export async function getCourtBookings(datetime:string, courtID:string): Promise<CourtBooking[]> { //, type: string, numPersons: number, courtName:string
    const client = createClient({
        projectId: "46b4kxer",
        dataset: "production",
        apiVersion: "2024-02-27"
    })

    return client.fetch(
      groq`*[_type == "booking" && start == $datetime && court._ref == $courtID]{
          _id,
          _createdAt,
          court,
          start,
          end,
          type,
          numPeople
      }`,
      { datetime, courtID} //, type, numPersons, courtName           && type == $type && numPeople == $numPersons && court.name == $courtName
  );
}

export async function getCourtID(courtName:string): Promise<Court[]> { 
    const client = createClient({
        projectId: "46b4kxer",
        dataset: "production",
        apiVersion: "2024-02-27"
    })

    return client.fetch(
      groq`*[_type == "court" && name == $courtName]{
          _id
      }`,
      { courtName }
  );
}

export async function addCourtBookings(courtID: string, startDatetime: string, endDatetime: string, bookingType: string, numPersons: number, userID: string ): Promise<boolean> {
    const client = createClient({
        projectId: "46b4kxer",
        dataset: "production",
        apiVersion: "2024-02-27"
    })

    try {
    const transactionResult = await client.transaction()
    .create({
        _type: 'booking',
        court: { _type: 'reference', _ref: courtID },
        start: startDatetime,
        end: endDatetime,
        type: bookingType,
        numPeople: numPersons,
        user: { _type: 'reference', _ref: userID }
    })
    .commit();

    return true;
    
    }catch (error) {
        console.error('Error creating booking:', error);
        return false;
    }

}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////