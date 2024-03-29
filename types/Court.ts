import { PortableTextBlock } from "sanity";

export type Court = {
    _id: string;
    _createdAt: string;
    name: string;
    content: PortableTextBlock[];
}