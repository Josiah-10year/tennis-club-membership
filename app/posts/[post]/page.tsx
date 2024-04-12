"use client"
import { Post } from "@/types/Post";
import { Comment } from "@/types/Comment"
import { getPost } from "../../../sanity/sanity-utils";
import { getComments } from "../../../sanity/sanity-utils";
import CommentComponent from '../../components/Comment';
type Props={
    params: { post: string }
}

export default async function Project({ params }: Props) {
    const slug = params.post;
    const posts = await getPost(slug);
    const post = posts[0]
    const comments = await getComments(post._id);

    //format image link function
    const formatImageLink = (imageURL: string): string => {
        // First, remove "image-"
        imageURL = imageURL.replace("image-", "");
        // Then, swap "-jpg" to ".jpg" and "-png" to ".png"
        imageURL = imageURL.replace("-jpg", ".jpg");
        imageURL = imageURL.replace("-png", ".png");

        //finally put it in the right format
        imageURL = "https://cdn.sanity.io/images/46b4kxer/production/" + imageURL

        return imageURL
    }

    if (!post) {
        return <div>Loading...</div>;
    }
    return (
        <div className="max-w-5xl mx-auto py-20">
            <h1>{post.title}</h1><br></br>
            {post.images && post.images.map((image, imageIndex) => (
                <img 
                    key={imageIndex} 
                    src={image.asset && image.asset._ref ? formatImageLink(image.asset._ref) : ''} 
                    alt={`Image ${imageIndex}`} 
                    className="w-full h-auto max-w-[600px] rounded-lg shadow-md mb-4"
                />
            ))}
            <br></br>
            <p className="text-gray-500">{post.description}</p>
            <br></br><br></br>
            {comments[0]? (
                <div>
                    <h2 className="text-xl font-bold mt-8 mb-4">Comments</h2>
                    {comments.map((comment: Comment) => (
                        <CommentComponent comment={comment} />         
                    ))}
                </div>
            ):(
                <div>
                    <p className="text-xs">no comments to display</p>
                </div>
            )}
            
        </div>
    );

}