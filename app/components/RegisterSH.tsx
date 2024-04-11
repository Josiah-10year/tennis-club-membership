"use client"
import { registerUser } from "../../sanity/sanity-utils";
import { useState } from "react";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Topics from "../components/TopicsSH";
import { User } from "../../types/User";
import Interests from "../components/InterestsSH";
import { URL } from "url";
import { InputType } from "zlib";
import { File } from "buffer";

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
    userArrayProp: User[];
}

const Index: FC<indexProps> = ({ topicsArrayProp, interestsArrayProp }) => {
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
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            username: "",
            password: "",
            bio: "",
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
        registerUser(
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
        <div className="relative">
        <div className="w-full h-[400px] relative">
        </div>
        <div className="max-w-7xl mx-auto mt-[-120px] relative bg-white px-8 sm:px-20">
            <h1 className="text-center py-8 font-site">Register</h1>
            <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-blue-site p-8">
            <h3 className="font-site text-lg my-3">Account Details</h3>
                <div className="flex flex-col sm:flex-row sm:gap-12">
                <div className="basis-1/2">
                    <label className="text-xs" htmlFor="first">
                    First Name *
                    </label>
                    <input
                    className="input"
                    type="text"
                    id="firstname"
                    required={true}
                    {...register("firstname")}
                    />
                    <label className="text-xs" htmlFor="email">
                    Email Address*
                    </label>
                    <input
                    className="input"
                    type="email"
                    id="email"
                    required={true}
                    {...register("email")}
                    />
                    <label className="text-xs" htmlFor="username">
                    Username *
                    </label>
                    <input 
                    className="input" 
                    type="text" 
                    id="username"
                    required={true}
                    {...register("username")}
                    />
                </div>
                <div className="basis-1/2">
                    <label className="text-xs" htmlFor="last">
                    Last Name *
                    </label>
                    <input 
                    className="input" 
                    type="text" 
                    id="lastname"
                    required={true}
                    {...register("lastname")}
                    />
                    <label className="text-xs" htmlFor="phone">
                    Phone Number*
                    </label>
                    <input 
                    className="input" 
                    type="tel" 
                    id="phone"
                    required={true} 
                    {...register("phone")}
                    />
                    <label className="text-xs" htmlFor="password">
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
                <h3 className="font-site text-lg my-3">Profile Setup</h3>
                <div className="flex flex-col sm:flex-row sm:gap-12">
                <div className="basis-1/2">
                    <label className="text-xs" htmlFor="avatar">
                    Avatar
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
                    <label className="text-xs" htmlFor="bio">
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
                <Topics topicsArrayProp={topics}/>
                </div>
                <Interests interestsArrayProp={interests}/>
                <div className="flex flex-col sm:flex-row sm:gap-12">
                <div className="basis-1/2">
                    <button className="btn-sec w-full mt-6 text-xl" type="reset">
                    Reset Form
                    </button>
                </div>
                <div className="basis-1/2">
                    <button className="btn-main w-full mt-6 text-xl" type="submit">
                    Submit Form
                    </button>
                </div>
                </div>

                <div className="text-xs tracking-widest">
                <br></br>
                <p>Already have an account?<a href="/"> <u>Sign in here</u></a></p>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}

export default Index