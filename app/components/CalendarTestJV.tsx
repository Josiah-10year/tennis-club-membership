"use client"
import { FC, useState } from 'react'
import ReactCalendar from 'react-calendar'
import './CalendarTestJV.css'
import { add, format } from 'date-fns'
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '../constants/config'
import { Court } from "@/types/Court";
import { CourtBooking } from "@/types/CourtBooking";


interface IndexProps {
    courtArrayProp: Court[];
    fullyBookedDates: string[];
    courtBookingsArray: CourtBooking[];
    userID: string;
}

interface DateType {
    courtName: string | null
    justDate: Date | null
    dateTime: Date | null
    type: string | null
    numPersons: number | null
}

const Index: FC<IndexProps> = ({ courtArrayProp, fullyBookedDates, courtBookingsArray, userID }) => {

    //console.log(courtBookingsArray)

    const [date, setDate] = useState<DateType>({
        courtName: null,
        justDate: null,
        dateTime: null,
        type: null,
        numPersons: null
    })


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

    const tileDisabled = ({ date }: { date: Date }) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        return fullyBookedDates.includes(formattedDate);
    };



    const getTimes = () => {
        if (!date.justDate) return //guard clause

        const { justDate } = date

        const beginning = add(justDate, { hours: STORE_OPENING_TIME }) //opening at 9
        const end = add(justDate, { hours: STORE_CLOSING_TIME }) //closing at 5
        const interval = INTERVAL // in minutes

        const times = []
        for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
            times.push(i)
        }

        return times

    }

    const times = getTimes();
    const choices = ["open", "private"]
    const numPersonsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
        if (!type) return true


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
        //test
        return num > remainingCapacity;
    };

    // Function to convert UTC time to Atlantic Time (AST)
    function convertUtcToAst(utcDate: Date): Date {
        // Get the UTC time components
        const utcYear = utcDate.getUTCFullYear();
        const utcMonth = utcDate.getUTCMonth();
        const utcDay = utcDate.getUTCDate();
        const utcHours = utcDate.getUTCHours();
        const utcMinutes = utcDate.getUTCMinutes();
        const utcSeconds = utcDate.getUTCSeconds();

        // Create a new Date object using UTC components
        const astDate = new Date(Date.UTC(utcYear, utcMonth, utcDay, utcHours, utcMinutes, utcSeconds));

        // Convert UTC time to Atlantic Time (subtract 4 hours)
        astDate.setHours(astDate.getHours() - 4);

        return astDate;
    }

    return (

        <div className='grid justify-center items-start'>
            {date.courtName ? (
                date.justDate ? (
                    date.dateTime ? (
                        date.type ? (
                            date.numPersons ? (
                                <div>
                                <a className="bg-lime-600 text-white text-center rounded-lg px-4 py-2 hover:bg-opacity-100 hover:scale-105" onClick={() => setDate((prev) => ({ ...prev, numPersons: null }))} >Back </a>
                                <br></br><br></br>
                                <div className="border-2 p-1 border-gray-600 rounded-lg  hover:border-blue-600 hover:bg-blue-100 transition">
                                    <a
                                        href={`/court_bookings/${encodeURIComponent(date.courtName)}/${encodeURIComponent(date.dateTime.toString())}/${encodeURIComponent(date.type)}/${encodeURIComponent(date.numPersons)}/${encodeURIComponent(userID)}`}
                                        key="test"
                                    >
                                        <div className="text-gray-800 mb-2">
                                            <h1 className="text-3xl py-6">Click to confirm your booking:</h1>
                                            <p className="text-gray-800 text-base mb-4"><span className="font-semibold">Court:</span> {date.courtName}</p>
                                            <p className="text-gray-800 text-base mb-4"><span className="font-semibold">Date Time:</span> {date.dateTime.toString()}</p>
                                            <p className="text-gray-800 text-base mb-4"><span className="font-semibold">Type:</span> {date.type}</p>
                                            <p className="text-gray-800 text-base mb-4"><span className="font-semibold">Number of People:</span> {date.numPersons}</p>
                                        </div>
                                    </a>

                                </div>
                                </div>
                            ) : (
                                <div>
                                    
                                    <a className="bg-lime-600 text-white text-center rounded-lg px-4 py-2 hover:bg-opacity-100 hover:scale-105" onClick={() => setDate((prev) => ({ ...prev, type: null }))} >Back </a>
                                    <h1 className="text-3xl py-3">Select the number of people:</h1><br></br>
                                    <div className='grid grid-cols-5 gap-5 lg:max-w-none lg:grid-cols-10 xl:grid-cols-10'>
                                        {numPersonsArray?.map((choice, i) => (
                                            <button type='button' key={`choice-${i}`} className='btn-main rounded-sm border p-2' disabled={isDisabledNumber(choice, date.dateTime, date.type)} onClick={() => setDate((prev) => ({ ...prev, numPersons: choice }))}>
                                                {choice.toString()}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            )

                        ) : (
                            <div>
                                <a className="bg-lime-600 text-white text-center rounded-lg px-4 py-2 hover:bg-opacity-100 hover:scale-105"  onClick={() => setDate(prev => ({ ...prev, dateTime: null }))} > Back </a>
                                <h1 className="text-3xl py-3">Select a booking type:</h1><br></br>
                                <div className='grid gap-5 grid-cols-2 lg:max-w-none lg:grid-cols-2 xl:grid-cols-2'>
                                    {choices?.map((choice, i) => (
                                        <button type='button' key={`choice-${i}`} className='rounded-sm btn-main border p-2' disabled={isDisabledType(choice, date.dateTime)} onClick={() => setDate((prev) => ({ ...prev, type: choice }))}>
                                            {choice}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )


                    ) : (
                        <div>
                            <a className="bg-lime-600 text-white text-center rounded-lg px-4 py-2 hover:bg-opacity-100 hover:scale-105" onClick={() => setDate((prev) => ({ ...prev, justDate: null }))} > Back </a>
                            <h1 className="text-3xl py-3">Select a timeslot:</h1><br></br>
                            <div className='grid grid-cols-3 gap-5 lg:max-w-none lg:grid-cols-6 xl:grid-cols-12'>
                                {times?.map((time, i) => (
                                    <button key={`time-${i}`} className='rounded-sm border btn-main p-2' type='button' disabled={isDisabled(time, date.justDate)} onClick={() => setDate(prev => ({ ...prev, dateTime: time }))} >
                                        {format(convertUtcToAst(time), 'hh:mm a')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )

                ) : (

                    <div className="grid grid-cols-1 gap-5 lg:max-w-none">
                        <a className="bg-lime-600 text-white text-center rounded-lg px-4 py-2 hover:bg-opacity-100 hover:scale-105" onClick={() => setDate((prev) => ({ ...prev, courtName: null }))} > Back </a>
                        <h1 className="text-3xl">Select a date:</h1><br></br>
                        <ReactCalendar
                            minDate={new Date()}
                            className='REACT-CALENDAR p-s'
                            view='month'
                            onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
                            tileDisabled={tileDisabled}
                        />
                    </div>)

            ) : (
                <div>
                    <h1 className="text-3xl">Select a court:</h1><br></br>
                    <div className='grid grid-cols-1 gap-5 lg:max-w-none md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
                        {courtArrayProp?.map((court, i) => (
                            <div key={`court-${i}`} className='rounded-sm bg-gray-100 p-2'>

                                {court.image?.asset ? (
                                    <div>
                                        <img
                                            key={court.image.asset._key}
                                            src={formatImageLink(court.image.asset._ref)}
                                            onClick={() => setDate((prev) => ({ ...prev, courtName: court.name }))}
                                            alt={`Image ${court.name}`}
                                            className="w-auto h-auto max-w-[200px] rounded-lg shadow-md mb-4"
                                        />
                                    </div>
                                ) : (
                                    <div></div>
                                )}

                                <button type='button' onClick={() => setDate((prev) => ({ ...prev, courtName: court.name }))}>
                                    {court.name}
                                </button>

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Index