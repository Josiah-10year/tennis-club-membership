"use client"
import { getCourts } from "../../sanity/sanity-utils";
import { FC, useState } from 'react'
import ReactCalendar from 'react-calendar'
import './CalendarTestJV.css'
import {add, format} from 'date-fns'
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '../constants/config'
import { Court } from "@/types/Court";



interface indexProps {
    stringArrayProp: string[];
}

interface DateType{
    courtName: String | null
    justDate: Date | null
    dateTime: Date | null
}

const index: FC<indexProps> =  ({stringArrayProp }) => {

    const [date, setDate] = useState<DateType>({
        courtName: null,
        justDate: null,
        dateTime: null
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
    console.log("Court: " + date.courtName + " Time: " + date.dateTime) } 

    const times = getTimes();
    const courts = stringArrayProp;
    

    return (
    <div className='h-screen flex flex-col justify-center items-center'>
        {date.courtName ? (
            date.justDate ? (
                date.dateTime ?(

                    <div>
                        <p>Selection completed, info should then be sent to Sanity</p>
                        <button onClick={log_console}>|Click here to log output the console|</button>
                    </div>
                    

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