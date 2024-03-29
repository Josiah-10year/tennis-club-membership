import { createClient, groq } from "next-sanity"
import { Event } from "../types/Event"
import { NoticeBoard } from "../types/NoticeBoard"

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
            name,
            "slug": slug.current,
            date,
            location,
            discription
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
          discription
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