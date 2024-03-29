import { Image, PortableTextBlock } from "sanity";

type TopicReference = {
    _type: 'reference';
    _ref: string;
}

type InterestReference = {
    _type: 'reference';
    _ref: string;
}

//then fetch user based on reference value

export type User = {
    _id: string;
    _createdAt: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    image: Image;
    bio: Text;
    subscriptions: TopicReference;
    interests: InterestReference;
    role: string;
    content: PortableTextBlock[];
}
