import { PortableTextBlock } from "sanity";

type UserReference = {
    _type: 'reference';
    _ref: string;
}

type PostReference = {
    _type: 'reference';
    _ref: string;
}

//then fetch user based on reference value

export type CourtBooking = {
    _id: string;
    _createdAt: string;
    user: UserReference;
    post: PostReference;
    text: Text;
    content: PortableTextBlock[];
}