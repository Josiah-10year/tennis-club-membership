import { createClient, groq } from "next-sanity"
import { Event } from "../types/Event"
import { NoticeBoard } from "../types/NoticeBoard"
import { Court } from "../types/Court"
import { Topic } from "../types/Topic"
import { User } from "@/types/User"

const client = createClient({
    projectId: "46b4kxer",
    dataset: "production",
    apiVersion: "2024-02-27"
})

//FETCH
export async function getEvents(): Promise<Event[]> {
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
    return client.fetch(
        groq`*[_type == "court"]{
            _id,
            _createdAt,
            name
        }`
    )
}

export async function getAllTopics(): Promise<Topic[]> {
    return client.fetch(
        groq`*[_type == "topic"]{name, _id}`
    )
}

export async function getAllInterests(): Promise<Topic[]> {
    return client.fetch(
        groq`*[_type == "interest"]{name, _id}`
    )
}

export async function getUser(): Promise<User[]> {
    return client.fetch(
        groq`*[_type == "user"]`
    )
}

import {randomKey} from '@sanity/util/content'
// POST
export async function createUser(){
    client.create({
        _type: 'user',
        title: 'Some book title',
        interests: [
            {
                _type: 'reference',
                _ref: 'id-of-author-document'
            }
        ]
      })
      .then(result => {
        console.log(`Created book with id: ${result._id}`)
      })
}