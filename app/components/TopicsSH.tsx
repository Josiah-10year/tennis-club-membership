"use client"
import { FC } from 'react'

type Topic = {
    name: string,
    _id: string
}

interface indexProps {
    topicsArrayProp: Topic[];
}

const index: FC<indexProps> = ({ topicsArrayProp }) => {
    const topics = topicsArrayProp;

    return (
        <div className="basis-1/2">
            <label className="text-gray-800 text-sm font-semibold" htmlFor="subscriptions">
                Topic Subscriptions
            </label>
            {topics?.map((topic, i) => (
                <div key={`topic._id-${i}`}>
                    <input className="text-xs topic" value={topic._id} type="checkbox" key={`topic._id-${i}`} />
                    <label className="text-xs" htmlFor={`topic._id-${i}`}> {topic.name}</label>
                </div>
            ))}
            <br></br>
        </div>
    )
}

export default index