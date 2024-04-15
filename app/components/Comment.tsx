"use client"
import { getUserByID, deleteBooking } from "../../sanity/sanity-utils";
import { FC, useState } from 'react'
import {add, format} from 'date-fns'
import Link from "next/link";
import { Comment } from "@/types/Comment";
import { User } from "@/types/User";
import { usePathname, useRouter } from "next/navigation";



interface indexProps {
    comment: Comment;
    commenterID: string;
    userID: User | undefined | null;
}

// interface DateType{
//     courtName: string | null
//     justDate: Date | null
//     dateTime: Date | null
//     type: string | null
//     numPersons: number | null
// }

const Index: FC<indexProps> =  async ({comment, commenterID, userID}) => {
    
    // const [date, setDate] = useState<DateType>({
    //     courtName: null,
    //     justDate: null,
    //     dateTime: null,
    //     type: null,
    //     numPersons: null
    // })

    //first get the user
    const users = await getUserByID(comment.user._ref)
    const user = users[0]

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

    //format date function
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        };
        return date.toLocaleDateString(undefined, options);
      };

      let deletebutton = false

      if(userID){

        if(userID._id === commenterID){
            deletebutton = true
        }
      }

    function handleDelete(id: string): void {
        deleteBooking(id)
        // router.push(pathname)
        // router.refresh()
        setTimeout(() => {
            // Code to execute after the delay
            location.reload();
        }, 1000);
        
        
    }

    return(
        <div key={comment._id} className="border rounded p-4 my-4 flex items-start relative">
            {/* You can fetch and display user details based on the comment's user reference */}
            {user.image.asset ? (
                <div>
                    <img src= {formatImageLink(user.image.asset?._ref)} className="w-8 h-8 rounded-full mr-2"></img>
                </div>
            ):(
                <div>
                    <img src="https://raw.githubusercontent.com/Josiah-10year/tennis-club-membership/new-opps/app/images/default-profile-icon.jpg" className="w-8 h-8 rounded-full mr-2"></img>                
                </div>
            )}
            <p className="font-bold">@{user.username.current}</p>
            <p className="ml-1">{comment.text.toString()}</p>

            {deletebutton && (
            <button className= "absolute top-0 right-0 text-xs text-red-500 font-bold mr-2 border border-red-500 px-2 py-1 rounded" onClick={() => handleDelete(comment._id)}>
                X
            </button>
        )}
        
            <p className="absolute bottom-0 right-0 text-xs text-gray-500">{formatDate(comment._createdAt)}</p>
        </div>
        
    );
}

export default Index