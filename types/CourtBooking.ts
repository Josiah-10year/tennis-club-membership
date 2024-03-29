import { PortableTextBlock } from "sanity";

type UserReference = {
    _type: 'reference';
    _ref: string;
}

type CourtReference = {
    _type: 'reference';
    _ref: string;
}

//then fetch user based on reference value

export type CourtBooking = {
    _id: string;
    _createdAt: string;
    name: string;
    member: UserReference;
    court: CourtReference;
    location: string;
    content: PortableTextBlock[];
}