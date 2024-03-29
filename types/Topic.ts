import { PortableTextBlock } from "sanity";

export type Topic = {
    _id: string;
    _createdAt: string;
    name: string;
    slug: string;
    content: PortableTextBlock[];
}