const court = {
    name: 'court',
    title: 'Court',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The name of the court',
      }
    ],
  };
  
  export default court;