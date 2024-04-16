import { Comment } from "@/types/Comment"
import { getComments,getPost, getUser } from "../../../sanity/sanity-utils";
import CommentComponent from '../../components/Comment';
import CommentForm from '../../components/CommentForm';
import { getServerSession } from "next-auth";
import { authConfig} from "@/app/lib/auth";

type Props = {
    params: { post: string }
}

export default async function Project({ params }: Props) {

    const slug = params.post;
    const posts = await getPost(slug);
    const post = posts[0]
    const comments = await getComments(post._id);

    const sortCommentsByCreatedAt = (comments: Comment[]): Comment[] => {
        return comments.sort((a, b) => {
            // Convert the _createdAt strings to Date objects
            const dateA = new Date(a._createdAt);
            const dateB = new Date(b._createdAt);

            // Compare the dates in reverse order to sort from newest to oldest
            if (dateA > dateB) {
                return -1;
            }
            if (dateA < dateB) {
                return 1;
            }
            return 0;
        });
    };

    const sortedComments = sortCommentsByCreatedAt(comments);

    const formatImageLink = (imageURL: string): string => {
        // First, remove "image-"
        imageURL = imageURL.replace("image-", "");
        // Then, swap "-jpg" to ".jpg" and "-png" to ".png"
        imageURL = imageURL.replace("-jpg", ".jpg");
        imageURL = imageURL.replace("-png", ".png");

        imageURL = "https://cdn.sanity.io/images/46b4kxer/production/" + imageURL

        return imageURL
    }

    const session = await getServerSession(authConfig);

    let user;
    let username: string | null | undefined = null
    if (session) {
        username = session?.user?.email

        if (typeof username == "undefined" || !username)
            username = ""

        const users = await getUser(username);
        user = users[0]
    }

    let currentUser = user
    if (!post) {
        return <div>Loading...</div>;
    }
    return (
        <div className="max-w-5xl mx-auto py-20">
            <a className="bg-lime-600 text-white text-center rounded-lg px-4 py-2 hover:bg-opacity-100 hover:scale-105" href="/posts">Back</a>
            <h1 className="py-4">{post.title}</h1>
            {post.images && post.images.map((image, imageIndex) => (
                <img
                    key={imageIndex}
                    src={image.asset && image.asset._ref ? formatImageLink(image.asset._ref) : ''}
                    alt={`Image ${imageIndex}`}
                    className="w-auto h-auto max-w-[600px] rounded-lg shadow-md mb-4"
                />
            ))}
            <br></br>
            <p className="text-gray-800">{post.description}</p>
            <br></br><br></br>
            <h2 className="text-xl font-bold mt-8 mb-4">Comments</h2>
            <CommentForm userProp={user} postID={post._id} />
            {sortedComments[0] ? (
                <div>
                    {sortedComments.map((comment: Comment) => (
                        <CommentComponent key={comment._id} comment={comment} commenterID={comment.user._ref} userID={currentUser} />
                    ))}
                </div>

            ) : (
                <div>
                    <p className="text-xs text-gray-600">no comments to display</p>
                </div>
            )}
        </div>
    );
}