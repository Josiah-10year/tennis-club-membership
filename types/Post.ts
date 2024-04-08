import { Image, PortableTextBlock } from "sanity";
type TopicReference = {
    _type: 'reference';
    _ref: string;
}

type UserReference = {
    _type: 'reference';
    _ref: string;
}

//then fetch user based on reference value

export type Post = {
    _id: string;
    _createdAt: string;
    title: string;
    slug: string;
    description: string;
    topic: string;
    images: Array<{ asset: { _ref: string } }>;
    author: string;
};