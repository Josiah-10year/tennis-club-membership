"use client"
import { registerUser } from "../../sanity/sanity-utils";
import { useState } from "react";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Topics from "../components/TopicsSH";
import Interests from "../components/InterestsSH";
import { useRouter } from "next/navigation";

type Topic = {
    name: string,
    _id: string
}

type Interest = {
    name: string,
    _id: string
}

type User = {
    username: {_type: string, current: string},
    email: string
}

interface indexProps {
    topicsArrayProp: Topic[];
    interestsArrayProp: Interest[];
    userArrayProp: User[];
}

const Index: FC<indexProps> = ({ topicsArrayProp, interestsArrayProp, userArrayProp }) => {
    const topics = topicsArrayProp;
    const interests = interestsArrayProp;
    const userInfo = userArrayProp;
    const router = useRouter();
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

    //function to handle no spaces typed
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Check if the pressed key is a space (keyCode 32) and prevent default action
        if (event.key === " ") {
          event.preventDefault();
        }
      };

    // Function for handling the form submission
    const onSubmit: SubmitHandler< FormInput> = (data) => {
        let error: boolean = false
        userInfo.forEach((user) => {
            if (user.username.current === data.username.toLowerCase()){
                error = true
                return (window.alert("SUBMISSION ERROR\nThe username you have entered is already taken.\nPlease enter another username."))
            }
            else if (user.email === data.email){
                error = true
                return (window.alert("SUBMISSION ERROR\nAn account with this email already exists\nPlease use another email."))
            }
        })
        if(!error){
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
                data.username.toLowerCase(), 
                data.password, 
                data.image, 
                data.bio,
                selectedTopics,
                selectedInterests
            )
            router.push("/login");
            return (window.alert("CONGRATULATIONS!\nYou have been registered successfully.\nYou are now a member of the St. Augustine Recreational Club!"))
        }
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
        <div className="w-full h-[200px] ">
        </div>
        <div className="max-w-7xl mx-auto mt-[-120px] bg-white px-8 sm:px-20">
            <h1 className="text-center py-8">Register</h1>
            <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-blue-site p-8">
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
                    onKeyDown={handleKeyDown}
                    required={true}
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
                <h3 className="font-semibold text-gray-800 text-lg my-3">Profile Setup</h3>
                <div className="flex flex-col sm:flex-row sm:gap-12">
                <div className="basis-1/2">
                    <label className="text-gray-800 font-semibold text-sm" htmlFor="avatar">
                    Avatar
                    </label>
                    <input
                    className="input text-xs"
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
                <Topics topicsArrayProp={topics}/>
                </div>
                <Interests interestsArrayProp={interests}/>
                <div className="flex flex-col sm:flex-row sm:gap-12">
                <div className="basis-1/2">
                    <button className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-gray-500 rounded-lg focus:shadow-outline hover:bg-gray-600" type="reset">
                    Reset Form
                    </button>
                </div>
                <div className="basis-1/2">
                    <button className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700" type="submit">
                    Submit Form
                    </button>
                </div>
                </div>

                <div className="text-xs tracking-widest">
                <br></br>
                <p className="text-xs">Already have an account?<a href="/"> <u className="text-blue-600 underline">Sign in here</u></a></p>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}

export default Index