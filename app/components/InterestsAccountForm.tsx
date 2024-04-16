import { FC } from 'react'

type Interest = {
    name: string,
    _id: string
}

type InterestReference = {
    _ref: string,
    _type: string
}

interface indexProps {
    interestsArrayProp: Interest[];
    userInterestsArrayProp: InterestReference[];
}



const index: FC<indexProps> = ({ interestsArrayProp, userInterestsArrayProp }) => {
    const interests = interestsArrayProp;

    // Function to check if an interest is selected by the user
    const isChecked = (interestID: string): boolean => {
        const found = userInterestsArrayProp.some(interest => interest._ref === interestID);
        return found ? true : false;
    };

    return (
        <div className="flex flex-col sm:flex-row sm:gap-12">
            <label className="text-gray-800 font-semibold text-sm" htmlFor="interests">
                Interests
            </label>
            {interests?.map((interest, i) => (
                <div key={`topic._id-${i}`}>
                    <input className="text-xs interest" value={interest._id} type="checkbox" key={`topic._id-${i}`} defaultChecked={isChecked(interest._id)} />
                    <label className="text-xs" htmlFor={`topic._id-${i}`}> {interest.name}</label>
                </div>
            ))}
        </div>
    )
}

export default index