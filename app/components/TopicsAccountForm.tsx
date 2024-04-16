"use client"
import { FC } from 'react'

type Topic = {
    name: string,
    _id: string
}

type TopicReference = {
    _ref: string,
    _type: string
}

interface indexProps {
    topicsArrayProp: Topic[];
    userTopicsArrayProp: TopicReference[];
}

const index: FC<indexProps> = ({ topicsArrayProp, userTopicsArrayProp }) => {
    const topics = topicsArrayProp;

    // Function to check if a topic is subscribed by the user
    const isChecked = (topicID: string): boolean => {
        const found = userTopicsArrayProp.some(topic => topic._ref === topicID);
        return found ? true : false;
    };

    return (
        <div className="basis-1/2">
            <label className="text-gray-800 font-semibold text-sm" htmlFor="subscriptions">
                Topic Subscriptions
            </label>
            {topics?.map((topic, i) => (
                <div key={`topic._id-${i}`}>
                    <input className="text-xs topic" value={topic._id} type="checkbox" key={`topic._id-${i}`} defaultChecked={isChecked(topic._id)} />
                    <label className="text-xs" htmlFor={`topic._id-${i}`}> {topic.name}</label>
                </div>
            ))}
        </div>
    )
}

export default index