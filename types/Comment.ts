//JV - courts
import { PortableTextBlock } from "sanity";
import { Post } from "./Post";

type UserReference = {
    _type: 'reference';
    _ref: string;
}  

type PostReference = {
    _type: 'reference';
    _ref: string;
}

//then fetch user based on reference value

export type Comment = {
    _id: string;
    _createdAt: string;
    user: UserReference;
    post: PostReference;
    text: Text;
}