"use client"
import { getCourts } from "../../sanity/sanity-utils";
import { FC, useState } from 'react'
import ReactCalendar from 'react-calendar'
import './CalendarTestJV.css'
import {add, format} from 'date-fns'
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '../constants/config'
import { Court } from "@/types/Court";
import Link from "next/link";
import { CourtBooking } from "@/types/CourtBooking";



interface indexProps {
    stringArrayProp: string[];
    fullyBookedDates: string[];
    courtBookingsArray: CourtBooking[];
    userID: string;
}

interface DateType{
    courtName: string | null
    justDate: Date | null
    dateTime: Date | null
    type: string | null
    numPersons: number | null
}

const index: FC<indexProps> =  ({stringArrayProp, fullyBookedDates, courtBookingsArray, userID}) => {

    //console.log(courtBookingsArray)

    const [date, setDate] = useState<DateType>({
        courtName: null,
        justDate: null,
        dateTime: null,
        type: null,
        numPersons: null
    })


    

    const tileDisabled = ({ date }: { date: Date }) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        return fullyBookedDates.includes(formattedDate);
    };



    const getTimes = () => {
        if(!date.justDate) return //guard clause

        const { justDate } = date

        const beginning = add(justDate, {hours: STORE_OPENING_TIME}) //opening at 9
        const end = add(justDate, {hours: STORE_CLOSING_TIME}) //closing at 5
        const interval = INTERVAL // in minutes

        const times = []
        for (let i = beginning; i <= end; i = add(i, {minutes: interval})) {
            times.push(i)
        }

        return times

    }

    const times = getTimes();
    const courts = stringArrayProp;
    const choices = ["open","private"]
    const numPersonsArray = [1,2,3,4,5,6,7,8,9,10]

    const isDisabled = (time: Date, selectedDate: Date | null): boolean => {
        // If no date selected, all slots are enabled
        if (!selectedDate) return false;
    
        // Merge date and time to create the target date-time for comparison
        const targetDateTime = new Date(selectedDate);
        targetDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
    
        // Convert target date-time to ISO string for comparison
        const formattedDateTime = targetDateTime.toISOString();
    
        // Filter bookings for the selected date and time slot
        const bookingsForSelectedDateTime = courtBookingsArray.filter(
            booking => {
                // Convert booking start time to Date object for comparison
                const bookingDateTime = new Date(booking.start);
    
                // Check if booking start time matches the target date-time
                return bookingDateTime.toISOString() === formattedDateTime;
            }
        );
    
        // If there are no bookings, slot is available
        if (bookingsForSelectedDateTime.length === 0) {
            return false;
        }
    
        // Check if there is any private booking, if yes, slot is disabled
        const hasPrivateBooking = bookingsForSelectedDateTime.some(booking => booking.type === 'private');
        if (hasPrivateBooking) {
            return true;
        }
    
        // Calculate total number of people for open bookings
        const totalPersonsForOpenBookings = bookingsForSelectedDateTime.reduce(
            (total, booking) => total + booking.numPeople,
            0
        );
    
        // If total number of people for open bookings exceeds 4, slot is disabled
        return totalPersonsForOpenBookings >= 4;
    };
    

const isDisabledType = (choice: string, dateTime: Date | null): boolean => {
    if (!dateTime) return true; // If no date selected, all types are disabled
    const courtBookingsArray2 = [...courtBookingsArray];
    const bookingDateTime = new Date(dateTime);
    const bookingsForSelectedDateTime = courtBookingsArray2.filter(
        booking => {
            const bookingStart = new Date(booking.start);
            return (
                bookingStart.getFullYear() === bookingDateTime.getFullYear() &&
                bookingStart.getMonth() === bookingDateTime.getMonth() &&
                bookingStart.getDate() === bookingDateTime.getDate() &&
                bookingStart.getHours() === bookingDateTime.getHours() &&
                bookingStart.getMinutes() === bookingDateTime.getMinutes()
            );
        }
    );
    if (bookingsForSelectedDateTime.length === 0) {
        // If there are no bookings in that timeslot, all booking types are enabled
        return false;
    }

    if (choice === 'private') {
        // If there is any booking in that timeslot and the choice is "private", return true
        return true;
    }
    // If there are bookings but the choice is not "private", return false
    return false;
};

const isDisabledNumber = (num: number, dateTime: Date | null, type: string | null): boolean => {
    if (!dateTime) return true; // If no date selected, disable all numbers
    if(!type) return true


    if (type === "private") return false;
    
    const courtBookingsArray2 = [...courtBookingsArray];
    const bookingDateTime = new Date(dateTime);

    // Filter bookings for the selected date and time slot
    const bookingsForSelectedDateTime = courtBookingsArray2.filter(booking => {
        const bookingStart = new Date(booking.start);
        return (
            bookingStart.getFullYear() === bookingDateTime.getFullYear() &&
            bookingStart.getMonth() === bookingDateTime.getMonth() &&
            bookingStart.getDate() === bookingDateTime.getDate() &&
            bookingStart.getHours() === bookingDateTime.getHours() &&
            bookingStart.getMinutes() === bookingDateTime.getMinutes()
        );
    });

    // Calculate the sum of all numPersons in the bookings
    const sumNumPersons = bookingsForSelectedDateTime.reduce(
        (total, booking) => total + booking.numPeople,
        0
    );

    // Calculate the remaining capacity
    const remainingCapacity = 4 - sumNumPersons;

    // If the selected number is greater than the remaining capacity, disable it
    return num > remainingCapacity;
};

    return (
    <div className='h-screen flex flex-col justify-center items-center'>
        {date.courtName ? (
            date.justDate ? (
                date.dateTime ?(
                    date.type ?(
                        date.numPersons ?(
                            <div>
                                <a 
                                    href= {`/court_bookings/${encodeURIComponent(date.courtName)}/${encodeURIComponent(date.dateTime.toString())}/${encodeURIComponent(date.type)}/${encodeURIComponent(date.numPersons)}/${encodeURIComponent(userID)}`}
                                    key="test" 
                                    className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition"
                                    >
                                        <div className="text-gray-600 mb-2">
                                        Click to confirm your booking: <br></br>
                                        Court: {date.courtName} <br></br>
                                        Date Time: {date.dateTime.toString()} <br></br>
                                        Type: {date.type} <br></br>
                                        Number of People: {date.numPersons}
                                        </div>
                                </a>
                                
                            </div>
                        ) : (
                            <div className='flex gap-4'>
                                Select Number of Persons: <br></br>
                        {numPersonsArray?.map((choice, i) => (
                        <div key={`choice-${i}`} className= 'rounded-sm bg-gray-100 p-2'>
                            <button type='button' disabled={isDisabledNumber(choice, date.dateTime, date.type)} onClick={() => setDate((prev) => ({...prev, numPersons: choice}))}>
                            {choice.toString()}
                            </button>
                        </div>
                        ))}
                        </div>

                        )
                        
                    ) : (
                        <div className='flex gap-4'>
                            Select Booking Type: <br></br>
                    {choices?.map((choice, i) => (
                        <div key={`choice-${i}`} className= 'rounded-sm bg-gray-100 p-2'>
                            <button type='button' disabled={isDisabledType(choice, date.dateTime)} onClick={() => setDate((prev) => ({...prev, type: choice}))}>
                            {choice}
                            </button>
                        </div>
                    ))}
                </div>
                    )
                    

                ):(
                    <div className='flex gap-4'>
                    {times?.map((time, i) => (
                        <div key={`time-${i}`} className= 'rounded-sm bg-gray-100 p-2'>
                            <button type='button' disabled={isDisabled(time, date.justDate)} onClick={() => setDate(prev => ({ ...prev, dateTime: time }))} >
                                {format(time, 'kk:mm')}
                            </button>
                        </div>
                    ))}
                </div>
                )
                
                ) : (
                <ReactCalendar 
                minDate={new Date()}
                className='REACT-CALENDAR p-s' 
                view='month' 
                onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date}))}
                tileDisabled={tileDisabled}
                />)

        ) : (
            <div className='flex gap-4'>

                    {courts?.map((court, i) => (
                        <div key={`court-${i}`} className= 'rounded-sm bg-gray-100 p-2'>
                            <button type='button' onClick={() => setDate((prev) => ({...prev, courtName: court})) }>
                               {court}
                            </button>
                            
                        </div>
                    ))}
                </div>
        )}
    </div>
    )
}

export default index