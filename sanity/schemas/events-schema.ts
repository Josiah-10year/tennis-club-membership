const event = {
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The name of the event',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'title' },
        description: 'The slug for the event URL',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'Description of the event',
      },
      {
        name: 'start',
        title: 'Start',
        type: 'datetime',
        initialValue: (new Date()).toISOString(),
        validation: (Rule: { required: () => any }) => Rule.required()
    },
    {
        name: 'end',
        title: 'End',
        type: 'datetime',
        initialValue: (new Date()).toISOString(),
        validation: (Rule: { required: () => any }) => Rule.required()
    },
    {
      name: 'topic',
      title: 'Topic',
      description: 'The topic the event falls under',
      type: 'reference',
      to: [{type: 'topic'}],
        options: {
          layout: 'tags',
        },
      validation: (Rule: { required: () => any }) => Rule.required()
  },
  {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
          {
              type: 'image',
              options: {
                  hotspot: true
              }
          }
      ]
  },
  {
      name: 'host',
      title: 'Host',
      type: 'string',
      description: 'The party organising the event',
      validation: (Rule: { required: () => any }) => Rule.required()
  },
      {
        name: 'location',
        title: 'Location',
        type: 'string',
        description: 'The location of the event',
      },
      {
        name: 'author',
        title: 'Author',
        type: 'array',
        of: [
            {
                type: 'reference',
                to: [{type: 'user'}],
            }
        ],
        options: {
            layout: 'tags',
        },
        validation: (Rule: { required: () => any }) => Rule.required().length(1)
    },
    ],
  };
  
  export default event;
  