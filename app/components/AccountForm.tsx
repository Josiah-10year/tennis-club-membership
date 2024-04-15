"use client"
import { registerUser, updateUser } from "../../sanity/sanity-utils";
import { useState } from "react";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Topics from "../components/TopicsAccountForm";
import { User } from "../../types/User";
import Interests from "../components/InterestsAccountForm";
import { URL } from "url";
import { InputType } from "zlib";
import { File } from "buffer";
import { CourtBooking } from "@/types/CourtBooking";
import Link from "next/link";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Image from "next/image";

type Topic = {
    name: string,
    _id: string
}

type Interest = {
    name: string,
    _id: string
}

interface indexProps {
    topicsArrayProp: Topic[];
    interestsArrayProp: Interest[];
    userProp: User;
    imageURL: string;
}

const Index: FC<indexProps> = ({ topicsArrayProp, interestsArrayProp, userProp, imageURL}) => {
    const topics = topicsArrayProp;
    const interests = interestsArrayProp;
    const [FormInput, setFormData] = useState<FormInput | undefined>(undefined);
    interface FormInput{
        firstname: string,
        lastname: string,
        email: string,
        phone: string,
        username: string,
        password: string;
        image: FileList;
        bio: string;
        interests: string[];
    }

    // Sets up our form states 
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
            
    // Prepares the functions from react-hook-form
    const { 
        register, 
        handleSubmit, 
        watch,
        formState: {errors}
    } = useForm< FormInput>(
        {
        defaultValues: {
            firstname: userProp.firstName,
            lastname: userProp.lastName,
            email: userProp.email,
            phone: userProp.phone,
            username: userProp.username.current,
            password: userProp.password,
            bio: userProp.bio.toString(),
            interests: []
        }
        }
    );

    // Function for handling the form submission
    const onSubmit: SubmitHandler< FormInput> = (data) => {
        const selectedTopics: string[] = [];
        const topics = document.querySelectorAll('input.topic[type="checkbox"]:checked') as unknown as HTMLInputElement[];
        topics.forEach((subscription) => {
            selectedTopics.push(subscription.value);
        });

        const selectedInterests: string[] = [];
        const interests = document.querySelectorAll('input.interest[type="checkbox"]:checked') as unknown as HTMLInputElement[];
        interests.forEach((interest) => {
            selectedInterests.push(interest.value);
        });
        updateUser(
            userProp._id,
            data.firstname, 
            data.lastname, 
            data.email, 
            data.phone, 
            data.username, 
            data.password, 
            data.image, 
            data.bio,
            selectedTopics,
            selectedInterests
        )

        setTimeout(() => {
            //needs a delay to show correct stuff
        }, 1000);

        //revalidatePath('/account') // Update cached posts
        //redirect(`/home`) // Navigate to the new post page
    }

    if (isSubmitting) {
        // Returns a "Submitting comment" state if being processed
        return <h3>Submitting comment…</h3>
    }
    if (hasSubmitted) {
        // Returns the data that the user submitted for them to preview after submission
        return (
        <>
            <h3>Thanks for your comment!</h3>
            <ul>
            <li>
                {/* Name: {onSubmit.name} <br />
                Email: {formData.email} <br />
                Comment: {formData.comment} */}
            </li>
            </ul>
        </>
        )
    }

    return (
        <div>
        <div className="w-full h-[100px]">
        </div>
        <div className="max-w-7xl mx-auto mt-[-120px] bg-white px-8 sm:px-20">
            <h1 className="text-center py-8">My Profile</h1>
            <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-blue-site p-8">

            <div className="flex flex-col items-center justify-center">
            <div className="sm:px-20">
                {/* <Image src={imageURL} alt={"Profile Pic"} /> */}
                <img className="w-[200px] border rounded-full shadow-md h-auto"src={imageURL} alt={"Profile Pic"} />
            </div>
            <div className="sm:px-20">
                <h3>@{userProp.username.current}</h3><br></br>
            </div>
            </div>

            <h3 className="font-semibold text-gray-800 text-lg my-3">Account Details</h3>
                <div className="flex flex-col sm:flex-row sm:gap-12">
                <div className="basis-1/2">
                    <label className="text-gray-800 font-semibold text-sm" htmlFor="first">
                    First Name *
                    </label>
                    <input
                    className="input"
                    type="text"
                    id="firstname"
                    required={true}
                    {...register("firstname")}
                    />
                    <label className="text-gray-800 font-semibold text-sm" htmlFor="email">
                    Email Address*
                    </label>
                    <input
                    className="input"
                    type="email"
                    id="email"
                    required={true}
                    {...register("email")}
                    />
                    <label className="text-gray-800 font-semibold text-sm" htmlFor="username">
                    Username *
                    </label>
                    <input 
                    className="input" 
                    type="text" 
                    id="username"
                    required={true}
                    readOnly
                    {...register("username")}
                    />
                </div>
                <div className="basis-1/2">
                    <label className="text-gray-800 font-semibold text-sm" htmlFor="last">
                    Last Name *
                    </label>
                    <input 
                    className="input" 
                    type="text" 
                    id="lastname"
                    required={true}
                    {...register("lastname")}
                    />
                    <label className="text-gray-800 font-semibold text-sm" htmlFor="phone">
                    Phone Number*
                    </label>
                    <input 
                    className="input" 
                    type="tel" 
                    id="phone"
                    required={true} 
                    {...register("phone")}
                    />
                    <label className="text-gray-800 font-semibold text-sm" htmlFor="password">
                    Password *
                    </label>
                    <input
                    className="input"
                    type="password"
                    id="password"
                    required={true}
                    {...register("password")}
                    />
                </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg my-3">Profile Details</h3>
                <div className="flex flex-col sm:flex-row sm:gap-12">
                <div className="basis-1/2">
                    <label className="text-gray-800 font-semibold text-sm" htmlFor="avatar">
                    Update Your Avatar
                    </label>
                    <input
                    className="input"
                    type="file"
                    id="avatar"
                    accept="image/*"
                    capture
                    placeholder="Image"
                    {...register("image")}
                    />
                    <label className="text-gray-800 font-semibold text-sm" htmlFor="bio">
                    Bio
                    </label>
                    <textarea
                    className="input"
                    id="bio"
                    maxLength={250}
                    cols={50}
                    rows={4}
                    style={{resize: 'none', borderWidth: '1px'}}
                    {...register("bio")}
                    />
                </div>
                <Topics topicsArrayProp={topics} userTopicsArrayProp={userProp.subscriptions}/>
                </div>
                <Interests interestsArrayProp={interests} userInterestsArrayProp = {userProp.interests}/>
                <div className="flex flex-col sm:flex-row sm:gap-12">
                <div className="basis-1/2">
                    <Link href="/home">
                        <button className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-red-500 rounded-lg focus:shadow-outline hover:bg-red-600" >
                        EXIT
                        </button>
                    </Link>
                </div>
                <div className="basis-1/2">
                    <button className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-700" type="submit">
                    SAVE CHANGES
                    </button>
                </div>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}

export default Index