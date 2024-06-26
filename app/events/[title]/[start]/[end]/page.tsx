"use client"
import { getEventDetails, getAdminUsers } from "../../../../../sanity/sanity-utils";

type Props = {
    params: { title: string, start: string, end: string }
}

export default async function EventDetails({ params }: Props) { // in () put 

    type UserReference = {
        _type: 'reference';
        _ref: string;
    }

    const formattedTitle = decodeURIComponent(params.title)

    const decodedStart = decodeURIComponent(params.start)
    const decodedStartDate = new Date(decodedStart);
    const formattedStartDate = decodedStartDate.toISOString();

    const decodedEnd = decodeURIComponent(params.end)
    const decodedEndDate = new Date(decodedEnd);
    const formattedEndDate = decodedEndDate.toISOString();

    //Query to find this event
    const events = await getEventDetails(formattedTitle, formattedStartDate, formattedEndDate)

    //get all admin users who could publish
    const authors = await getAdminUsers()

    const getAdminName = (admin: UserReference): string => {
        // Loop through the list of authors
        console.log("USER: " + admin)
        const userID = admin._ref
        console.log("ID: " + userID)
        for (const author of authors) {
            console.log("list not empty")
            // Check if the author ID matches the userID parameter
            if (author._id === userID) {
                console.log("match found")
                // If found, return the author's first name
                return author.firstName + " " + author.lastName;
            }
        }
        // If no matching author is found, return an empty string
        return "";
    }

    //format date function
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        };
        return date.toLocaleDateString(undefined, options);
    };

    //format image link function
    const formatImageLink = (imageURL: string): string => {
        // First, remove "image-"
        imageURL = imageURL.replace("image-", "");
        // Then, swap "-jpg" to ".jpg" and "-png" to ".png"
        imageURL = imageURL.replace("-jpg", ".jpg");
        imageURL = imageURL.replace("-png", ".png");

        //finally put it in the right format
        imageURL = "https://cdn.sanity.io/images/46b4kxer/production/" + imageURL

        return imageURL
    }

    //i am doing it like this because it thows issue if the particular event isnt defined; dont worry, only one event will come up anyways
    return (
        <div>
            <div className="max-w-5xl mx-auto py-20">
                <div className="container mx-auto px-12">
                    <a className="bg-lime-600 text-white text-center rounded-lg px-4 py-2 hover:bg-opacity-100 hover:scale-105" href="/events">Back</a>
                    {events.map((event, index) => (
                        <div key={index} className="my-8 bg-white rounded-lg shadow-xl p-8">
                            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                            {event.images && event.images.map((image, imageIndex) => (
                                <img
                                    key={imageIndex}
                                    src={image.asset && image.asset._ref ? formatImageLink(image.asset._ref) : ''}
                                    alt={`Image ${imageIndex}`}
                                    className="w-full h-auto max-w-[600px] sm:w-auto sm:max-w-[600px] md:w-auto md:max-w-[600px] rounded-lg shadow-md mb-4"
                                />
                            ))}
                            <p className="text-gray-800 text-sm mb-4"><span className="font-semibold">Hosted by:</span> {event.host}</p>
                            <p className="text-gray-800 text-sm mb-4"><span className="font-semibold">Description:</span> {event.description.toString()}</p>
                            <p className="text-gray-800 text-sm mb-4"><span className="font-semibold">Start:</span> {formatDate(event.start)}</p>
                            <p className="text-gray-800 text-sm mb-4"><span className="font-semibold">End:</span> {formatDate(event.end)}</p>
                            <p className="text-gray-800 text-sm mb-4"><span className="font-semibold">Venue:</span> {event.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}