const interest = {
    name: 'interest',
    title: 'Interest',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The name of the interest',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'name' },
        description: 'The slug for the interest',
      },
    ],
  };
  
  export default interest;