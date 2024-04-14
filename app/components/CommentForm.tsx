"use client"
import { useState, ChangeEvent, FormEvent, FC } from 'react';
import { authConfig, loginIsRequiredClient, useloginIsRequiredServer } from "../lib/auth";
import { Session, getServerSession } from 'next-auth';
import { User } from '@/types/User';
import { useRouter } from 'next/navigation';
import { addComment } from '@/sanity/sanity-utils';
import { usePathname } from 'next/navigation'

interface indexProps {
    // usernameProp: string;
    userProp?: User | null;
    postID: string;
}



const Index: FC<indexProps> = ({userProp, postID}) => {
    const [comment, setComment] = useState<string>('');

    const router = useRouter();
    
    const pathname = usePathname()

    if (!userProp) {
        // Handle the case where userProp is null
        return(
            <div>
            <form className="flex items-center">
            <input
                type="text"
                value={comment}
                placeholder="Sign in to leave a comment..."
                className="border border-gray-300 rounded-md p-2 mr-2 flex-grow"
                disabled/>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
                    onClick={() => router.push('/login')}
                    disabled>
                    Submit
                </button>
        </form>
        <u><a href='/login' className='text-blue-600 underline text-sm'>Click here to sign in</a></u>
        <br></br>
        </div>
        );
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission here
        
        console.log('Submitted:', comment);
        if(comment !== "")
            addComment(comment, userProp._id , postID)
        // Clear the input field after submission
        setComment('');
        setTimeout(() => {
            // Code to execute after the delay
            location.reload();
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <input
                type="text"
                value={comment}
                onChange={handleChange}
                placeholder="Leave a comment..."
                className="border border-gray-300 rounded-md p-2 mr-2 flex-grow"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
            >
                Submit
            </button>
        </form>
    );
}

export default Index
