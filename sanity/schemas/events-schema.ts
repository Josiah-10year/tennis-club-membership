const event = {
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        description: 'The name of the event',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'name' },
        description: 'The slug for the event URL',
      },
      {
        name: 'date',
        title: 'Date',
        type: 'datetime',
        description: 'The date and time of the event',
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string',
        description: 'The location of the event',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: 'Alternative text for the event image',
          },
        ],
        description: 'Image representing the event',
      },
      {
        name: 'url',
        title: 'URL',
        type: 'url',
        description: 'URL for more information about the event',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'Description of the event',
      },
    ],
  };
  
  export default event;
  