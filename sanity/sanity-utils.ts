import { createClient, groq } from "next-sanity"
import { Event } from "../types/Event"
import { Comment } from "../types/Comment"
import { Court } from "../types/Court"
import { CourtBooking } from "../types/CourtBooking"
import { Topic } from "../types/Topic"
import { Interest } from "../types/Interest"
import { User } from "@/types/User"
import {Post} from '../types/Post'

const token = "skc7uoGs1D3dTG4DlvaLaTnZZGEGDerzo0hc9qo1R53iiE6gYsG5XMX4RR1fNLCvS9gx8qOXTzsIGgfHgqMO0LEOpw150EBQEXaKRb04V8pj1D6TSXfi2x98LZL3Ls0qybA5qguOU0hm4zv4sTZfHo0L6OF6fgI6PKAIzFlFuwEDE8QVkvc9"
const token2 = "skGzsq7QBzxzA4t26ggMQNyJs0fRxV6sh70Vv1pDooSXM0LOp9K1NMVE18G5cFklqkCt0ubEyTl4K8Vr1HByZtDcvPhkvUG2WwpWOL5A1q2zx7vGSuvbqpokl5bMDqm4H6rprFSkG8zxBRGnaFqj7qUrfkflAyfRPzIyt3OnNsC3kfWSaoY9"

const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms));

const client = createClient({
    projectId: "46b4kxer",
    dataset: "production",
    apiVersion: "2024-02-27",
    token: token,
    useCdn: false
})


//FETCH
export async function getEvents(): Promise<Event[]> {
    return client.fetch(
        groq`*[_type == "event"]{
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            start,
            end,
            location,
            description
        }`,
        {},
        {cache: 'no-store'}
    );
}

export async function getEvent(slug: string): Promise<Event> {
    return client.fetch(
      groq`*[_type == "event"]{
          _id,
          _createdAt,
          name,
          "slug": slug.current,
          date,
          location,
          description
      }`
  )
}

export async function getEventDetails(title: string, start: string, end: string): Promise<Event[]> {
    return client.fetch(
      groq`*[_type == "event" && title == $title && start == $start && end == $end]`,
      { title, start, end},
  )
}

///////////////////Functions to pull courts//////////////////////////
/////////////////////////////////////////////////////////////////////

export async function getCourts(): Promise<Court[]> {
    return client.fetch(
        groq`*[_type == "court"]`
    )
}

///////////////////Functions to find if booking is there//////////////////////////
//////////////////////////////////////////////////////////////////////////////////

export async function getCourtBookingsAfterToday(): Promise<CourtBooking[]> {
    // const client = createClient({
    //     projectId: "46b4kxer",
    //     dataset: "production",
    //     apiVersion: "2024-02-27",
    //     useCdn: false
    // });
    // Get today's date at 12 am
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return client.fetch(
        groq`*[_type == "booking" && start >= $datetime]{
            _id,
            _createdAt,
            court,
            start,
            end,
            type,
            numPeople
        }`,
        { datetime: today.toISOString() },
        {cache: 'no-store'},
    );
}

export async function getCourtBookings(datetime:string, courtID:string): Promise<CourtBooking[]> { //, type: string, numPersons: number, courtName:string

    return client.fetch(
      groq`*[_type == "booking" && start == $datetime && court._ref == $courtID]{
          _id,
          _createdAt,
          court,
          start,
          end,
          type,
          numPeople
      }`,
      { datetime, courtID}, //, type, numPersons, courtName           && type == $type && numPeople == $numPersons && court.name == $courtName
      {cache: 'no-store'},
      );
}

export async function getCourtID(courtName:string): Promise<Court[]> { 
    return client.fetch(
      groq`*[_type == "court" && name == $courtName]{
          _id
      }`,
      { courtName }
  );
}

export async function addCourtBookings(courtID: string, startDatetime: string, endDatetime: string, bookingType: string, numPersons: number, userID: string ): Promise<boolean> {
    const client = createClient({
        projectId: "46b4kxer",
        dataset: "production",
        apiVersion: "2024-02-27",
        token: token,
        useCdn: false
    })

    try {
    await client.transaction()
    .create({
        _type: 'booking',
        court: { _type: 'reference', _ref: courtID },
        start: startDatetime,
        end: endDatetime,
        type: bookingType,
        numPeople: numPersons,
        user: { _type: 'reference', _ref: userID }
    })
    .commit();

    return true;
    
    }catch (error) {
        console.error('Error creating booking:', error);
        return false;
    }

}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
export async function getUser(username: string): Promise<User[]> {
    return client.fetch(
        groq`*[_type == "user" && username.current == $username]`,
        { username },
        {cache: 'no-store'},
    );
}

export async function getUserByID(userID: string): Promise<User[]> {
    return client.fetch(
        groq`*[_type == "user" && _id == $userID]`,
        { userID },
        {cache: 'no-store'},
    );
}

export async function getAdminUsers(): Promise<User[]> {
    return client.fetch(
        groq`*[_type == "user" && role == admin]`,
    );
}
//////////////////////////////////////////////////////////////////////////////////
////////////////My account page///////////////////////////////////////////

export async function getBookingsByUserID(userID: string): Promise<CourtBooking[]> { //, type: string, numPersons: number, courtName:string
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return client.fetch(
      groq`*[_type == "booking" && start >= $datetime && user._ref == $userID]{
          _id,
          _createdAt,
          court,
          start,
          end,
          type,
          numPeople
      }`,
      { datetime: today.toISOString(), userID}, //, type, numPersons, courtName           && type == $type && numPeople == $numPersons && court.name == $courtName
      {cache: 'no-store'},
      );
}

export async function getCourtName(courtID:string): Promise<Court[]> { 
    return client.fetch(
      groq`*[_type == "court" && _id == $courtID]{
          name
      }`,
      { courtID }
  );
}

export async function deleteBooking(bookingID: string): Promise<boolean> {
    try {
        // Execute the delete operation directly using the document ID
        await client.delete(bookingID);

        console.log(`Booking with ID ${bookingID} deleted successfully.`);
        return true
    } catch (error) {
        console.error(`Error deleting booking with ID ${bookingID}:`, error);
        throw error; // Rethrow the error to handle it elsewhere if needed
    }
}

export async function updateUser(
    userID: string,
    first: string,
    last: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    assetList: FileList,
    bio: string,
    topicIds: string[],
    interestIds: string[]
  ): Promise<boolean> {

    console.log("updating user")
    const subscriptions: Object[] = [];
    for (const id of topicIds) {
      subscriptions.push({ _type: "reference", _ref: id, _key: randomKey(12) });
    }
    
    const interests: Object[] = [];
    for (const id of interestIds) {
      interests.push({ _type: "reference", _ref: id, _key: randomKey(12) });
    }
    
    try {
      if (assetList.length !== 0) {
        const assetDocument = await client.assets.upload('image', assetList[0]);
        const image = {
          _type: "image",
          asset: {
            _ref: assetDocument._id,
            _type: "reference"
          }
        };
        
        const patchData = {
            firstName: first,
            lastName: last,
            email: email,
            phone: phone,
            username: { _type: 'slug', current: username },
            password: password,
            bio: bio,
            subscriptions: subscriptions,
            interests: interests,
            image: image
        };
        
        await client.patch(userID).set(patchData).commit();
        console.log('User updated successfully');
        return true;
      } else {
        const patchData = {
            firstName: first,
            lastName: last,
            email: email,
            phone: phone,
            username: { _type: 'slug', current: username },
            password: password,
            bio: bio,
            subscriptions: subscriptions,
            interests: interests
        };
        
        await client.patch(userID).set(patchData).commit();
        console.log('User updated successfully');
        return true;
      }
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
export async function getAllTopics(): Promise<Topic[]> {
    return client.fetch(
        groq`*[_type == "topic"]{name, _id}`
    )
}

export async function getAllInterests(): Promise<Interest[]> {
    return client.fetch(
        groq`*[_type == "interest"]{name, _id}`
    )
}

export async function getAllUsersUsernameAndEmail(): Promise<User[]> {
    return client.fetch(
        groq`*[_type == "user"]{username, email}`
    )
}

// POST
import { randomKey } from '@sanity/util/content'
export async function registerUser(first: string, last: string, email: string, phone: string, username: string, password: string, assetList: FileList, bio: string, topicIds: string[], interestIds: string[]): Promise<boolean> {
    
    //Now we account for them pasting in white space into the username for some reason. People love to defy rules
    function removeWhitespace(input: string): string {
        return input.replace(/\s/g, "");
    }
    
    const subscriptions: Object[] = []
    let x = 0
    for (const id of topicIds){
        subscriptions[x]= {_type: "reference", _ref: id, _key: randomKey(12)}
        x=x+1
    }
    
    const interests: Object[] = []
    x = 0
    for (const id of interestIds){
        interests[x]= {_type: "reference", _ref: id, _key: randomKey(12)}
        x=x+1
    }
    
    try {
        if (assetList.length != 0){
            client.assets.upload('image', assetList[0])
            .then(async (assetDocument) => {
                await client.create({
                    _type: 'user',
                    firstName: first,
                    lastName: last,
                    email: email,
                    phone: phone,
                    username: {_type: 'slug', current: removeWhitespace(username)},
                    password: password,
                    image: {
                        _type: "image",
                        asset:{
                        _ref: assetDocument._id,
                        _type:"reference"
                        }
                    },
                    bio: bio,
                    role: "user",
                    subscriptions: subscriptions,
                    interests: interests
                })
            })
        }
        else{
            await client.create({
                _type: 'user',
                firstName: first,
                lastName: last,
                email: email,
                phone: phone,
                username: {_type: 'slug', current: removeWhitespace(username)},
                password: password,
                bio: bio,
                role: "user",
                subscriptions: subscriptions,
                interests: interests
            })
        }
    }
    
    catch (error) {
        console.error('Error creating user:', error);
        return false;
    }
    return false
}

export async function getPosts(): Promise<Post[]> {
        return client.fetch(
            groq`*[_type == "post"]{
                _id,
                _createdAt,
                title,
                "slug": slug.current,
                description,
                images,
                "author": author->name
            }`
        );
    }

export async function getTopicbyName(name: string): Promise<Topic[]> {
    return client.fetch(
        groq`*[_type == "topic" && name == $name]`,
        {name}
    );
}

export async function getPostsByTopic(topicID: string): Promise<Post[]> {
    return client.fetch(
        groq`*[_type == "post" && topic._ref == $topicID ]{
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            description,
            images,
            "author": author->name
        }`,
        {topicID}
    );
}
    
export async function getPost(slug: string): Promise<Post[]> {
    return client.fetch(
        groq`*[_type == "post" && slug.current == $slug]{
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            description,
            images,
            "author": author->name
        }`,
        { slug }
    );
}    

    export async function getComments(postID: string): Promise<Comment[]> {
        return client.fetch(
            `*[_type == "comment" && post._ref == $postID]`,
            {postID},
            {cache: 'no-store'},
        );
    }

     export async function addComment(text: string, userID: string, postID: string): Promise<boolean> {
        
        try {
            await client.transaction()
            .create({
                _type: 'comment',
                user: { _type: 'reference', _ref: userID },
                post: { _type: 'reference', _ref: postID },
                text: text
            })
            .commit();
        
            return true;
            
            }catch (error) {
                console.error('Error adding comment:', error);
                return false;
            }
    }
