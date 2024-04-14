"use client"
import { Court } from "@/types/Court";
import { getCourtBookings, getCourtID, addCourtBookings, getUser, deleteBooking } from "../../../sanity/sanity-utils";
import {add, format} from 'date-fns'
// import { redirect } from "next/dist/server/api-utils";
import { redirect, useRouter } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { useEffect } from 'react';
import { authConfig, loginIsRequiredClient } from "@/app/lib/auth";//loginIsRequiredClient
import { getServerSession } from "next-auth";


type Props = {
    params: { bookingID: string}
}

const DeleteCourtBookings: React.FC<Props> = async ({ params }) => {
    const { bookingID } = params;

    const router = useRouter()
  
    const decodedBookingID = decodeURIComponent(bookingID);
    await deleteBooking(decodedBookingID);

    setTimeout(() => {
      // Code to execute after the delay
      router.push('/account')
      //location.assign()
      //redirect(`/account`);
  }, 1000);
  
          
  
    return (
      <div>
        You will be redirected shortly...
      </div>
    );
  };
  
  export default DeleteCourtBookings;