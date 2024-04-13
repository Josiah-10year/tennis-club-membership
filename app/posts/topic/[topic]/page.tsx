"use client"
import { use } from "react";
import { getAllTopics, getPostsByTopic, getTopicbyName } from "../../../../sanity/sanity-utils";
import Link from "next/link";
import { useRouter } from 'next/router';
import { FaArrowCircleUp } from 'react-icons/fa';
import { authConfig, loginIsRequiredClient } from "@/app/lib/auth";
import { getServerSession } from "next-auth";



type Props = {
    params: { topic: string}
}

export default async function EventDetails({params}: Props){  

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

            {/* Horizontal list of links */}
            <nav className="flex justify-between items-center mb-8">

            <a key={0} href={`/posts`} className="text-blue-600 hover:text-blue-900 transition text-xs">All</a>

                {topics.map((topic, index) => (
                <a key={index+1} href={`/posts/topic/${topic.name}`} className="text-blue-600 hover:text-blue-900 transition text-xs">{topic.name}</a>
                ))}

            </nav>

            <div className="mt-5 grid grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link href={`/posts/${post.slug}`} 
                    key={post._id} className="border p-4 rounded hover:scale-105 hover:border-blue-500 transition">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <p className="text-gray-500">{post.description}</p>
                        {/* <p className="text-sm text-gray-400 mt-2">Author: {post.author}</p> */}
                        {/* You can display images here if needed */}
                    </Link>
                ))}
            </div>
            {/* Back to top button */}
    <a href="" className="fixed bottom-4 right-4 z-50 rounded-full bg-white p-2 shadow-md" onClick={() => window.scrollTo(0, 0)}>
      <FaArrowCircleUp className="text-blue-500 text-3xl" />
    </a>
        </div>
    );
}