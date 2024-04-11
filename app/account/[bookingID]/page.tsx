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

export default async function DeleteCourtBookings({params}: Props){   
    await loginIsRequiredClient()

    const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms));
    const decodedBookingID = decodeURIComponent(params.bookingID)
    
    await deleteBooking(decodedBookingID); //, decodedType.toString(), decodedNumPersons, decodedCourtName.toString()

    revalidatePath('/account') // Update cached posts
    redirect(`/account`) // Navigate to the new post page
    return(

        <div>
            You will be redirected shortly...
        </div>

    );
}