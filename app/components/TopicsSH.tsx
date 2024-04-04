"use client"
import { FC } from 'react'

interface indexProps {
    topicsArrayProp: string[];
}

const index: FC<indexProps> =  ({ topicsArrayProp }) => {
    const topics = topicsArrayProp;
    
    return (
        <div className="basis-1/2">
            <label className="text-xs" htmlFor="subscriptions">
                  Topic Subscriptions
            </label>
            {topics?.map((topic, i) => (
                <div key={`topic-${i}`}>
                    <input className="input" type="checkbox" key={`topic-${i}`}/>
                    <label htmlFor={`topic-${i}`}>{topic}</label>
                </div>
            ))}
        </div>
    )
}

export default index