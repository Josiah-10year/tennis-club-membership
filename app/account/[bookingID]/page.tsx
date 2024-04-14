"use client"
import { Court } from "@/types/Court";
import { getCourtBookings, getCourtID, addCourtBookings, getUser, deleteBooking } from "../../../sanity/sanity-utils";
import {add, format} from 'date-fns'
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { useEffect } from 'react';
import { authConfig, loginIsRequiredClient } from "@/app/lib/auth";//loginIsRequiredClient
import { getServerSession } from "next-auth";


type Props = {
    params: { bookingID: string}
}

const DeleteCourtBookings: React.FC<Props> = ({ params }) => {
    const { bookingID } = params;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await loginIsRequiredClient();
          
          const decodedBookingID = decodeURIComponent(bookingID);
          await deleteBooking(decodedBookingID);
          
          // Update cached posts
          // Note: next/cache and revalidatePath are not standard Next.js features. 
          // If you need to refresh data, you might want to use data fetching methods like SWR or manual re-fetching.
          
          // Navigate to the new post page
          redirect(`/account`);
        } catch (error) {
          console.error('Error deleting booking:', error);
        }
      };
  
      fetchData();
    }, [bookingID]);
  
    return (
      <div>
        You will be redirected shortly...
      </div>
    );
  };
  
  export default DeleteCourtBookings;