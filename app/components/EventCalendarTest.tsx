"use client"
import { FC, useState } from 'react';
import { Calendar, View, dateFnsLocalizer } from 'react-big-calendar';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek';
import {getDay} from 'date-fns/getDay';
import {enUS} from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event } from '@/types/Event';
import './EventCalendarTest.css'
import { useRouter } from 'next/navigation';

interface IndexProps {
  eventArrayProp: Event[];
}

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Index: FC<IndexProps> = ({ eventArrayProp }) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Initial current date is today
  const [currentView, setCurrentView] = useState<View>('month'); // Initial view is month
  const router = useRouter(); // Initialize the useRouter hook

  const handleNavigate = (newDate: Date, view: View, action: any) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setCurrentView(newView);
  };

  const transformedEvents = eventArrayProp.map((event) => ({
    start: new Date(event.start),
    end: new Date(event.end),
    title: event.title,
  }));

  const handleonSelectEvent = (title: string, start: Date, end: Date) => {
    //send the user to the finer event details page
    const url = '/events/' + encodeURIComponent(title) + '/' + encodeURIComponent(start.toString()) + '/' + encodeURIComponent(end.toString())
    console.log("here?")
    router.push(url);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={transformedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, zIndex: 999 }}
        date={currentDate}
        defaultView={currentView}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        view={currentView}
        onSelectEvent={event => handleonSelectEvent(event.title, event.start, event.end)} //{event => alert(event.title)}
      />
    </div>
  );
};

export default Index;
