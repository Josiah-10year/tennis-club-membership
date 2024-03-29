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
    user: UserReference;
    court: CourtReference;
    start: string;
    end: string;
    type: string;
    numPeople: number;
    content: PortableTextBlock[];
}