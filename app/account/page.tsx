import { deleteBooking, getAllInterests, getAllTopics, getAllUsersUsernameAndEmail, getBookingsByUserID, getCourtName, getEvents, getUser } from "../../sanity/sanity-utils";
import Link from "next/link";
import { authConfig, useloginIsRequiredServer } from "../lib/auth";
import { getServerSession } from "next-auth";
import { User } from "@/types/User";
import Form from "../components/AccountForm"


export default async function MyAccount() {
    await useloginIsRequiredServer();


    const session = await getServerSession(authConfig);
    let username: string | null | undefined = ""
    if(session)
    username = session?.user?.email 
    if(typeof username == "undefined" || !username)
        username = ""
    const users = await getUser(username);
    const user = users[0]

    let imageURL = user.image.asset?._ref

    if(imageURL){
      // First, remove "image-"
    imageURL = imageURL.replace("image-", "");
    // Then, swap "-jpg" to ".jpg" and "-png" to ".png"
    imageURL = imageURL.replace("-jpg", ".jpg");
    imageURL = imageURL.replace("-png", ".png");

    //finally put it in the right format
    imageURL = "https://cdn.sanity.io/images/46b4kxer/production/" + imageURL

    }else{
      //idk code to a default image?
      imageURL = "../images/default-profile-icon.jpg"
    }


    //Set Up Form Now
    const topics = await getAllTopics();
    const interests = await getAllInterests();
    const bookings = await getBookingsByUserID(user._id);
    
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

    //get court name function
    const getCourtNameOnly = async (courtID: string): Promise<string> => {

      const courts = await getCourtName(courtID);
      const court = courts[0]
      
      return court.name;
    };

    //handle delete function
    const handleDeleteBooking = async (bookingID : string) => {
      try {
        await deleteBooking(bookingID);
        console.log('Booking deleted successfully.');
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    };

  return (
    <div className="max-w-5xl mx-auto py-20">

      {/* <h1 className="py-8 font-site sm:px-20">My Profile</h1><br></br> */}
        {/* <div className="sm:px-20">
          <img src={imageURL}></img>
        </div>
        <div className="sm:px-20">
          <h3>@{user.username.current}</h3><br></br>
        </div> */}

        <Form topicsArrayProp={topics} interestsArrayProp={interests} userProp={user} imageURL={imageURL}/>

        <br></br>
        <br></br>
        <center><h1 className="py-4 px-4 font-site text-gray-700">Upcoming Bookings</h1></center>
        <br></br>
        <div className="sm:px-20 flex flex-wrap">
        {bookings.map((booking) => (
          <div key={booking._id} className="w-1/2 sm:w-auto p-2">
            <div className="border border-gray-300 rounded-md shadow-xl p-4">
              <p>Court: {getCourtNameOnly(booking.court._ref)}</p>
              <p>Start: {formatDate(booking.start)}</p>
              <p>End: {formatDate(booking.end)}</p>
              <p>Type: {booking.type}</p>
              <p>Number of Persons: {booking.numPeople}</p>
              <br></br>
              {/* <div className="border border-gray-300 rounded-md p-1 inline-block mt-2"> */}
              <Link href={`/account/${encodeURIComponent(booking._id)}`} className="border p-1 rounded hover:scale-105 hover:border-red-500 hover:text-red-500 transition">
                Cancel Booking
              </Link>
                {/* <a href={`/account/${encodeURIComponent(booking._id)}`} className="hover:text-red-500">Cancel Booking</a> */}
              {/* </div> */}
            </div>
          </div>
        ))}
      </div>

    </div>
   );
}
