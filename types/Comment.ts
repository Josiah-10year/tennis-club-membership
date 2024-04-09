//JV - courts
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

export interface Comment {
    _id: string;
    _createdAt: string;
    user: {
        _id: string;
        name: string;
        // Add other user fields as needed
    };
    post: {
        _id: string;
        title: string;
        // Add other post fields as needed
    };
    text: string;
}