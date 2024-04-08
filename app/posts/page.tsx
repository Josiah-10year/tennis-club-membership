"use client"
import { use } from "react";
import { getPosts } from "../../sanity/sanity-utils";
import Link from "next/link";
import { useRouter } from 'next/router';

export default async function Posts() {
    const posts = await getPosts();

    return (
        <div className="max-w-5xl mx-auto py-20">
            <div className="mt-5 grid grid-cols-3 gap-8">
                {posts.map((post) => (
                    <div key={post._id} className="border p-4 rounded">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <p className="text-gray-500">{post.description}</p>
                        <p className="text-sm text-gray-400 mt-2">Topic: {post.topic}</p>
                        <p className="text-sm text-gray-400 mt-2">Author: {post.author}</p>
                        {/* You can display images here if needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}