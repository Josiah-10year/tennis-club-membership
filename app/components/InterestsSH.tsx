import { FC } from 'react'

type Interest = {
    name: string,
    _id: string
}

interface indexProps {
    interestsArrayProp: Interest[];
}

const index: FC<indexProps> =  ({ interestsArrayProp }) => {
    const interests = interestsArrayProp;

    return (
        <div className="flex flex-col sm:flex-row sm:gap-12">
            <label className="text-xs" htmlFor="interests">
                Interests
            </label>
            {interests?.map((interest, i) => (
                <div key={`topic._id-${i}`}>
                    <input className="text-xs interest" value={interest._id} type="checkbox" key={`topic._id-${i}`}/>
                    <label className="text-xs" htmlFor={`topic._id-${i}`}> {interest.name}</label>
                </div>
            ))}
        </div>
    )
}

export default index