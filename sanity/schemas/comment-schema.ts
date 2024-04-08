//comment for post Board
const comment = {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
    {
        name: 'user',
        title: 'Member',
        type: 'reference',
        to: [{type: 'user'}],
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The user that posted the comment',
        },
    {
        name: 'post',
        title: 'Post',
        type: 'reference',
        to: [{type: 'post'}],
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The post the user comment under',
        },
      {
        name: 'text',
        title: 'Comment',
        type: 'text',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The comment the user made',
      },
    ],
  };
  
  export default comment;