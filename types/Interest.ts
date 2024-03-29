import { PortableTextBlock } from "sanity";

export type Interest = {
    _id: string;
    _createdAt: string;
    name: string;
    slug: string;
    content: PortableTextBlock[];
}