import { createClient, groq } from "next-sanity"

export async function getEvents() {
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
            "image": image.asset->url,
            url,
            content
        }`
    )
}