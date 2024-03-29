const courtBooking = {
    name: 'booking',
    title: 'Court Booking',
    type: 'document',
    fields: [
      {
        name: 'user',
        title: 'Member',
        type: 'reference',
        to: [{type: 'user'}],
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The person who booked the court',
      },
      {
        name: 'court',
        title: 'Court',
        type: 'reference',
        to: [{type: 'court'}],
        options: {
          layout: 'tags',
        },
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The court booked',
      },
      {
        name: 'start',
        title: 'Start',
        type: 'datetime',
        initialValue: (new Date()).toISOString(),
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The datetime of the start of the booking timeslot',
      },
      {
        name: 'end',
        title: 'End',
        type: 'datetime',
        initialValue: (new Date()).toISOString(),
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The datetime of the end of the booking timeslot',
      },
      {
        name: 'type',
        title: 'Type of Booking',
        type: 'string',
        options: {
          list: [
              {title: 'Open', value: 'open'},
              {title: 'Private', value: 'private'}
          ],
          layout: 'radio'
        },
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'Private booking are closed and only for you. Open bookings remain open until 4 persons have booked it.',
      },
      {
        name: 'numPeople',
        title: 'Number of Persons',
        type: 'number',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'Number of persons attending',
      },
    ],
  };
  
  export default courtBooking;