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
/////////////////////////////////////////////////////////////////////

export async function getCourtBookingClashes(slunameg: string, ): Promise<Event> {
    const client = createClient({
        projectId: "46b4kxer",
        dataset: "production",
        apiVersion: "2024-02-27"
    })

    return client.fetch(
      groq`*[_type == "event"]{
          _id,
          _createdAt,
          court: CourtReference;

          "slug": slug.current,
          _id: string;
        _createdAt: string;
        user: UserReference;
        court: CourtReference;
        start: string;
        end: string;
        type: string;
        numPeople: number;
      }`
  )
}