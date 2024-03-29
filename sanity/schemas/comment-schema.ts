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
        description: 'The user that posted the comment',
        },
    {
        name: 'post',
        title: 'Post',
        type: 'reference',
        to: [{type: 'post'}],
        description: 'The post the user comment under',
        },
      {
        name: 'text',
        title: 'Comment',
        type: 'text',
        description: 'The comment the user made',
      },
    ],
  };
  
  export default comment;