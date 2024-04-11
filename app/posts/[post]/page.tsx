"use client"
import { getPost } from "../../../sanity/sanity-utils";
import { getComments } from "../../../sanity/sanity-utils";
type Props={
    params: { post: string }
}

export default async function Project({ params }: Props) {
    const slug = params.post;
    const post = await getPost(slug);
    const comments = await getComments();
    console.log(post)

    if (!post) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>{post.title}</h1>
            <p className="text-gray-500">{post.description}</p>
            {/* <p>{comments.text}</p> */}
        </div>
    );

}