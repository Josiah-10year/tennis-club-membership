const courtBooking = {
    name: 'booking',
    title: 'Court Booking',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        description: 'The name of the court booking',
      },
      {
        name: 'member',
        title: 'Member',
        type: 'reference',
        to: [{type: 'user'}],
        description: 'The person who booked the court',
      },
      {
        name: 'court',
        title: 'Court',
        type: 'reference',
        to: [{type: 'court'}],
        description: 'The court booked',
      },
      {
        name: 'start',
        title: 'Start',
        type: 'datetime',
        description: 'The datetime of the start of the booking timeslot',
      },
      {
        name: 'end',
        title: 'End',
        type: 'datetime',
        description: 'The datetime of the end of the booking timeslot',
      },
      {
        name: 'type',
        title: 'Type of Booking',
        type: 'string',
        description: 'The type of booking, whether open or closed',
      },
      {
        name: 'numPeople',
        title: 'Number of Persons',
        type: 'string',
        description: 'Number of persons attending',
      },
    ],
  };
  
  export default courtBooking;