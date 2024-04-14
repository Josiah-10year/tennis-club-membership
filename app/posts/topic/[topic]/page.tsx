"use client"
import { use } from "react";
import { getAllTopics, getPostsByTopic, getTopicbyName } from "../../../../sanity/sanity-utils";
import Link from "next/link";
import { useRouter } from 'next/router';
import { FaArrowCircleUp } from 'react-icons/fa';
import { authConfig, loginIsRequiredClient } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import BackToTopButton from "@/app/components/BackToTopButton";



type Props = {
    params: { topic: string }
}

export default async function EventDetails({ params }: Props) {

    // const session = await getServerSession(authConfig);

    // let username: string | null | undefined = null
    // if(session){
    //     username = session?.user?.email
    //     if(typeof username == "undefined" || !username)
    //         username = "-1"
    // }

    // console.log(username)

    // const users = await getUser(username);
    // user = users[0]

    //properly format info
    const formattedTopic = decodeURIComponent(params.topic)

    //Now pull by topic
    const topicList = await getTopicbyName(formattedTopic);
    const topic = topicList[0]
    const posts = await getPostsByTopic(topic._id);
    const topics = await getAllTopics()

    return (
        <div className="max-w-5xl mx-auto py-20">
            <h1 className="text-left py-8">Posts</h1>
            <div className="grid space-y-12 md:gap-8 lg:grid-cols-12 lg:gap-16 lg:space-y-0 xl:gap-16">
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="lg:block">
                        <h1 className="text-xl">Categories</h1>
                        <ul>
                            <li>
                                <a key={0} href={`/posts`} className="text-blue-600 hover:text-blue-900 transition text-foreground-light block text-base">All</a>
                            </li>
                            {topics.map((topic) => (
                                <li key={topic._id}> {/* Replace 'id' with your actual unique identifier */}
                                    <a
                                        href={`/posts/topic/${topic.name}`}
                                        className="text-blue-600 hover:text-blue-900 transition text-foreground-light block text-base"
                                    >
                                        {topic.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-8 xl:col-span-9">
                    <h1 className="text-2xl">{formattedTopic}</h1>
                        {posts[0] ? (
                            <div className="grid grid-cols-1 gap-5 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
                                {posts?.map((post) => (
                                    <Link href={`/posts/${post.slug}`} 
                                    key={post._id} className="border p-4 rounded hover:scale-105 hover:border-blue-500 transition">
                                        <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                                        <p className="text-sm text-gray-600">{post.description}</p>
                                        {/* <p className="text-sm text-gray-400 mt-2">Author: {post.author}</p> */}
                                        {/* You can display images here if needed */}
                                    </Link>
                                ))}
                            </div>
                        ) :
                        (
                            <div className="grid grid-cols-1 gap-5 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
                                <p className="text-sm text-gray-600 p-4">No posts under this category as yet</p>
                            </div>
                        )}
                </div>
            </div>
            {/* Back to top button */}
            <BackToTopButton />
        </div>
    );
}