import { Post } from "@/types/Post";
import { Comment } from "@/types/Comment"
import { getPost, getUser } from "../../../sanity/sanity-utils";
import { getComments } from "../../../sanity/sanity-utils";
import CommentComponent from '../../components/Comment';
import CommentForm from '../../components/CommentForm';
import { getServerSession } from "next-auth";
import { authConfig, loginIsRequiredClient, useloginIsRequiredServer } from "@/app/lib/auth";
import { User } from "@/types/User";
import { useSession } from "next-auth/react";
type Props={
    params: { post: string}
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

    
    
    const session = await getServerSession(authConfig);

    
    let user;
    let username: string | null | undefined = null
    if(session){
        username = session?.user?.email
        
        if(typeof username == "undefined" || !username)
            username = ""

        const users = await getUser(username);
        user = users[0]
    }

    //const bioText = new Text("test");
    

    let currentUser = user
    // if(typeof currentUser == "undefined")
    //     currentUser = {
    // _id: "1",
    // _createdAt: "1",
    // firstName: "",
    // lastName: "",
    // username: {_type: "slug", current: ""},
    // email: "",
    // phone: "",
    // password: "",
    // bio: "bioText",
    // subscriptions: [],
    // role: "",
    // interests: [],
    // content: [],
    // image: {}

    // }


    // console.log(user)

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
            <h2 className="text-xl font-bold mt-8 mb-4">Comments</h2>
                <CommentForm userProp={user} postID={post._id} />  
            {sortedComments[0]? (
                <div>
                    {sortedComments.map((comment: Comment) => (
                        <CommentComponent comment={comment} commenterID={comment.user._ref} userID={currentUser} />         
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