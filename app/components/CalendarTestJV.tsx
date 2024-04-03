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
}

const index: FC<indexProps> =  ({stringArrayProp}) => {

    const [date, setDate] = useState<DateType>({
        courtName: null,
        justDate: null,
        dateTime: null,
        type: null
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

    const log_console = () =>{
        console.log("2 Court: " + date.courtName + " date: " + date.dateTime)
    }

    const times = getTimes();
    const courts = stringArrayProp;
    const choices = ["open","private"]
    

    return (
    <div className='h-screen flex flex-col justify-center items-center'>
        {date.courtName ? (
            date.justDate ? (
                date.dateTime ?(
                    date.type ?(
                        <div>
                    <Link 
          
                    href= {`/court_bookings/${encodeURIComponent(date.courtName)}/${encodeURIComponent(date.dateTime.toString())}/${encodeURIComponent(date.type)}`}
                    key="test" 
                    className="border border-grey-500 rounded-lg p-1 hover:scale-105 hover:border-green-500 transition"
                    >
                    <div className="text-gray-600 mb-2">
                      Confirm your booking
                    
                    </div>
                    </Link>
                    </div>
                    ) : (
                        <div className='flex gap-4'>
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