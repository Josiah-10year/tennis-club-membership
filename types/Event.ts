import { Image, PortableTextBlock } from "sanity";

type TopicReference = {
    _type: 'reference';
    _ref: string;
}

type UserReference = {
    _type: 'reference';
    _ref: string;
}

export type Event = {
    _id: string;
    _createdAt: string;
    title: string;
    slug: string;
    description: Text;
    start: string;
    end: string;
    topic: TopicReference;
    images: Array<Image>;
    host: string;
    location: string;
    author: UserReference;
    content: PortableTextBlock[];
}
