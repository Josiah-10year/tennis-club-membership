"use client"
import { getCourts } from "../../sanity/sanity-utils";
import { FC, useState } from 'react'
import ReactCalendar from 'react-calendar'
import './CalendarTestJV.css'
import {add, format} from 'date-fns'
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '../constants/config'
import { Court } from "@/types/Court";
import Link from "next/link";



interface indexProps {
    stringArrayProp: string[];
}

interface DateType{
    courtName: string | null
    justDate: Date | null
    dateTime: Date | null
    type: string | null
    numPersons: number | null
}

const index: FC<indexProps> =  ({stringArrayProp}) => {

    const [date, setDate] = useState<DateType>({
        courtName: null,
        justDate: null,
        dateTime: null,
        type: null,
        numPersons: null
    })


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
    

    return (
    <div className='h-screen flex flex-col justify-center items-center'>
        {date.courtName ? (
            date.justDate ? (
                date.dateTime ?(
                    date.type ?(
                        date.numPersons ?(
                            <div>
                                <Link 
                                    href= {`/court_bookings/${encodeURIComponent(date.courtName)}/${encodeURIComponent(date.dateTime.toString())}/${encodeURIComponent(date.type)}/${encodeURIComponent(date.numPersons)}`}
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
                                </Link>
                            </div>
                        ) : (
                            <div className='flex gap-4'>
                                Select Number of Persons: <br></br>
                        {numPersonsArray?.map((choice, i) => (
                        <div key={`choice-${i}`} className= 'rounded-sm bg-gray-100 p-2'>
                            <button type='button' onClick={() => setDate((prev) => ({...prev, numPersons: choice}))}>
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
                            <button type='button' onClick={() => setDate((prev) => ({...prev, type: choice}))}>
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
                            <button type='button' onClick={() => setDate((prev) => ({...prev, dateTime: time}))}>
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