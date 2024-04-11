import { deleteBooking, getAllInterests, getAllTopics, getAllUsersUsernameAndEmail, getBookingsByUserID, getCourtName, getEvents, getUser } from "../../sanity/sanity-utils";
import Link from "next/link";
import { authConfig, loginIsRequiredServer } from "../lib/auth";
import { getServerSession } from "next-auth";
import { User } from "@/types/User";
import Form from "../components/AccountForm"


export default async function MyAccount() {
    await loginIsRequiredServer();


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

      <h1 className="py-8 font-site sm:px-20">My Profile</h1><br></br>
        <div className="sm:px-20">
          <img src={imageURL}></img>
        </div>
        <div className="sm:px-20">
          <h3>@{user.username.current}</h3><br></br>
        </div>

        <h1 className="py-8 font-site sm:px-20">Upcoming Bookings</h1><br></br>
        <div className="sm:px-20">
        {bookings.map((booking) => (
          <div>
            Court: {getCourtNameOnly(booking.court._ref)} <br></br>
            Start: {formatDate(booking.start)} <br></br>
            End: {formatDate(booking.end)} <br></br>
            Type: {booking.type} <br></br>
            Number of Persons: {booking.numPeople} <br></br>
            <div className="border border-gray-300 rounded-md p-1 inline-block">
              <a href= {`/account/${encodeURIComponent(booking._id)}`} className="hover:text-purple-700" >Cancel Booking</a>
            </div>
            <br></br><br></br>
          </div>
        ))}
        <br></br><br></br>
        </div>

        <Form topicsArrayProp={topics} interestsArrayProp={interests} userProp={user}/>
    </div>
   );
}
