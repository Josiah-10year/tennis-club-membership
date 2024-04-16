"use client"
import { getAllTopics, getPosts } from "../../sanity/sanity-utils";
import Link from "next/link";

import BackToTopButton from '../components/BackToTopButton';


export default async function Posts() {

    const posts = await getPosts();
    const topics = await getAllTopics()

    return (
        <div className="max-w-5xl mx-auto py-20">
            <h1 className="text-left py-8">Posts</h1>
            <div className="grid space-y-12 md:gap-8 lg:grid-cols-12 lg:gap-16 lg:space-y-0 xl:gap-16">
                <div className="lg:col-span-4 xl:col-span-3 p-4"> {/* Added padding here */}
                    <div className="lg:block">
                        <h1 className="text-xl">Categories</h1>
                        <ul>
                            <li>
                                <a key={0} href={`/posts`} className="text-lime-800 hover:text-lime-600 text-lime-700 transition text-foreground-light block text-base">All</a>
                            </li>
                            {topics.map((topic, index) => (
                                <li key={index}> {/* Use index as key for topics */}
                                    <a key={index+1} href={`/posts/topic/${topic.name}`} className="text-lime-800 hover:text-lime-600 transition text-foreground-light block text-base">{topic.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-8 xl:col-span-9 p-4"> {/* Added padding here */}
                    <h1 className="text-2xl">All Posts</h1>
                    <div className="grid grid-cols-1 gap-5 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
                        {posts.map((post) => (
                            <Link href={`/posts/${post.slug}`} key={post._id} className="border p-4 rounded hover:scale-105 hover:border-lime-600 transition">
                                <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                                <p className="text-sm text-gray-600">{post.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <BackToTopButton />
        </div>
    );
}