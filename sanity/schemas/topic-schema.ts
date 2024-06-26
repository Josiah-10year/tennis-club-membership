const topic = {
    name: 'topic',
    title: 'Topic',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The name of the topic',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'name' },
        description: 'The slug for the topic',
      },
    ],
  };
  
  export default topic;