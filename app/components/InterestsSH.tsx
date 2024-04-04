import { FC } from 'react'

interface indexProps {
    interestsArrayProp: string[];
}

const index: FC<indexProps> =  ({ interestsArrayProp }) => {

    const interests = interestsArrayProp;
    return (
        <div className="flex flex-col sm:flex-row sm:gap-12">
            <label className="text-xs" htmlFor="interests">
                Interests
            </label>
            {interests?.map((interest, i) => (
                <span className="tag-cloud" key={`interest-${i}`}>
                    {interest}
                </span>
            ))}
        </div>
    )
}

export default index