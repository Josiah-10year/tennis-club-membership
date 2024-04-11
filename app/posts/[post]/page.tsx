"use client"
import { Post } from "@/types/Post";
import { getPost } from "../../../sanity/sanity-utils";
import { getComments } from "../../../sanity/sanity-utils";
type Props={
    params: { post: string }
}

export default async function Project({ params }: Props) {
    const slug = params.post;
    const posts = await getPost(slug);
    const comments = await getComments();
    let post : Post
    post = posts[0]

    if (!post) {
        return <div>Loading...</div>;
    }
    return (
        <div className="max-w-5xl mx-auto py-20">
            <h1>{post.title}</h1>
            <p className="text-gray-500">{post.description}</p>
            {/* <p>{comments.text}</p> */}
        </div>
    );

}