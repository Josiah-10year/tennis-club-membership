import { getEvent } from "@/sanity/sanity-utils";

type Props = {
    params: { event: string }
}

export default async function Event({params}: Props) {

    const slug = params.event;
    const event = await getEvent(slug);

    // if (!event) {
    //     return <div>No event found</div>;
    // } to be turned into a 404 error handeling

    return(
        <div>
            <h3>Event Details</h3>
            <div>{event.name}</div>
        </div>

    );

}