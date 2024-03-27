"use client"
import { getEvents } from "../../sanity/sanity-utils";
import { FC, useState } from 'react'
import ReactCalendar from 'react-calendar'
import './CalendarTestJV.css'
import {add, format} from 'date-fns'
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '../constants/config'

interface indexProps {}

interface DateType{
    courtSlug: String | null
    justDate: Date | null
    dateTime: Date | null
}

const index: FC<indexProps> = ({}) => {

    const [date, setDate] = useState<DateType>({
        courtSlug: null,
        justDate: null,
        dateTime: null
    })

    const getCourts = () => {
        const courts = []

        // code to pull courts will be here instead
        //const events = await getEvents();

        //put court name into array
        courts.push("court a")
        courts.push("court b")
        
        return courts

    }

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
    const courts = getCourts();

    return (
    <div className='h-screen flex flex-col justify-center items-center'>
        {date.courtSlug ? (
            date.justDate ? (
                <div className='flex gap-4'>
                    {times?.map((time, i) => (
                        <div key={`time-${i}`} className= 'rounded-sm bg-gray-100 p-2'>
                            <button type='button' onClick={() => setDate((prev) => ({...prev, dateTime: time}))}>
                                {format(time, 'kk:mm')}
                            </button>
                        </div>
                    ))}
                </div>
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
                            <button type='button' onClick={() => setDate((prev) => ({...prev, courtSlug: court}))}>
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

//This was in return() before

{/* <div className='h-screen flex flex-col justify-center items-center'>
        {date.justDate ? (
        <div className='flex gap-4'>
            {times?.map((time, i) => (
                <div key={`time-${i}`} className= 'rounded-sm bg-gray-100 p-2'>
                    <button type='button' onClick={() => setDate((prev) => ({...prev, dateTime: time}))}>
                        {format(time, 'kk:mm')}
                    </button>
                </div>
            ))}
        </div>
        ) : (
        <ReactCalendar 
        minDate={new Date()}
        className='REACT-CALENDAR p-s' 
        view='month' 
        onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date}))}
        />)}
    </div> */}